import axios from "axios";
import { palmKey, CO_API_KEY, huggingFaceKey } from "../openaiKeys";
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { convertBlobToImage } from "./downloadFunctions";
import { storage } from "./storage";
import { uploadFunction } from "./uploadFunctions";
import { myEndpoints, headers } from "../config";

const apiUrl = 'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage';
const errorMessage = 'すみません。よくわかりませんでした'

const userIds = {
  user: 1,
  bot1: 2,
  bot2: 3,
  bot3: 4,
  bot4: 5,
  bot5: 6,
}

const userNames = {
  user: 'user',
  bot1: 'gemini',
  bot2: 'commandr',
  bot3: 'image',
  bot4: 'video',
  bot5: 'prompts',
}

const generateMessage = async({inputText}) => {
  try {
    const {data} = await axios.post(apiUrl, {
      prompt: { messages: [{ content: inputText }] },
      temperature: 0.1,
      candidateCount: 1,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        key: palmKey,
      },
    });
    if(data && data.candidates && data.candidates[0].content) {
      return data.candidates[0].content
    } else {
      return errorMessage
    }
  } catch (error) {
    console.log('generate message error:', error);
    return errorMessage
  }
}

const generateChatMessage = async({messages}) => {
  try {
    const { image, text } = messages[0]
    if(image) {
      const manipResult = await manipulateAsync(
        image,
        [{ resize: {width: 512} }],
        { compress: 1, format: SaveFormat.PNG }
      );
      const base64strings = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: FileSystem.EncodingType.Base64
      })
      const requestData = {
        contents: [
          {
            parts: [
              { text: text },
              {
                inline_data: {
                  mime_type: 'image/png',
                  data: base64strings,
                },
              },
            ],
          },
        ],
      };
      const {data} = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${palmKey}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(data && data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text
      } else {
        return errorMessage
      }
    } else {
      const _messages = messages.filter((v) => v.user._id === userIds.user || v.user._id === userIds.bot1)
      const formatedChatlog = formatChatlog({messages: _messages})
      const {data} = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + palmKey,
        {
          contents: formatedChatlog,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(data && data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text
      } else {
        return errorMessage
      }
    }
  } catch (error) {
    console.log('generate chat message error:', error);
    return errorMessage
  }
}

const formatChatlog = ({messages}) => {
  const result = messages.map((item) => {
    const { text, user } = item
    return {
      role: roleSwitch({user}),
      parts: [
        {
          text: text
        }
      ]
    }
  }).reverse()
  return result
}

const roleSwitch = ({user}) => {
  const { _id } = user
  const roles = {
    1: 'user',
    2: 'model',
    3: 'user',
    4: 'user',
    5: 'user',
    6: 'user',
    'default': 'user'
  }
  return (roles[_id] || roles['default'])
}

const roleSwitchChatHistory = ({user}) => {
  const { _id } = user
  const roles = {
    1: 'USER',
    2: 'USER',
    3: 'CHATBOT',
    4: 'USER',
    5: 'USER',
    6: 'USER',
    'default': 'USER'
  }
  return (roles[_id] || roles['default'])
}

const formatChatHistory = ({messages}) => {
  const result = messages.map((item) => {
    const { text, user } = item
    return {
      role: roleSwitchChatHistory({user}),
      message: text
    }
  })
  return result
}

const generateCommandRMessage = async({input, messages}) => {
  try {
    const _messages = messages.filter((v) => v.user._id === userIds.user || v.user._id === userIds.bot1 || v.user._id == userIds.bot2)
    const chat_history = formatChatHistory({messages: _messages})
    const url = 'https://api.cohere.ai/v1/chat';
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': `bearer ${CO_API_KEY}`
    };
    const body = {
      "chat_history": chat_history,
      "message": `「${input}」についてのあなたの見解を日本語で答えて`,
      "connectors": [{"id": "web-search"}]
    };

    const { data } = await axios.post(url, body, { headers });
    if(data.text) {
      return data.text
    } else {
      return errorMessage
    }
  } catch (e) {
    console.log('error', e)
    return errorMessage
  }
}

const generateImage = async({
  text, isImageMode,
  negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
  negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
}) => {
  try {
    const { apiUrl, negativePrompt } = selectImageAPI({
      isImageMode,
      negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
      negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
    })
    const { data } = await axios.post(
      apiUrl,
      {
        inputs: text,
        negative_prompt: negativePrompt,
      },
      {
        headers: {
          Authorization: `Bearer ${huggingFaceKey}`,
          'Content-Type': 'application/json'
        },
        responseType: 'blob'
      }
    );
    const imageUrl = await convertBlobToImage({data})
    return { imageUrl: imageUrl, message: '画像は開いた後に長押しで保存できます'}
  } catch(e) {
    console.log('generate image error', e)
    return { imageUrl: null, message: errorMessage}
  }
}

const selectImageAPI = ({
  isImageMode,
  negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
  negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
}) => {
  const RealisticVision = 'https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4'
  const Animagine = 'https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.1'
  const pony = 'https://api-inference.huggingface.co/models/stablediffusionapi/pony-diffusion-v6-xl'
  const pvc = 'https://api-inference.huggingface.co/models/p1atdev/pvcxl-v1-lora'
  const chillout = 'https://api-inference.huggingface.co/models/Yntec/ChilloutMix'
  const nsfwGenAnime = 'https://api-inference.huggingface.co/models/UnfilteredAI/NSFW-GEN-ANIME-v2'
  const novelAIRemix = 'https://api-inference.huggingface.co/models/Yntec/NovelAIRemix'
  const nsfwGen = 'https://api-inference.huggingface.co/models/UnfilteredAI/NSFW-gen-v2'
  switch (isImageMode){
    case 1:
      return { apiUrl: RealisticVision, negativePrompt: negativePromptRealisticVision }
    case 2:
      return { apiUrl: Animagine, negativePrompt: negativePromptAnimagine }
    case 3:
      return { apiUrl: pony, negativePrompt: negativePromptPony }
    case 4:
      return { apiUrl: pvc, negativePrompt: negativePromptPvc }
    case 5:
      return { apiUrl: chillout, negativePrompt: negativePromptChillOut }
    case 6:
      return { apiUrl: nsfwGenAnime, negativePrompt: negativePromptNsfwGenAnime }
    case 7:
      return { apiUrl: novelAIRemix, negativePrompt: negativePromptNovelAIRemix }
    case 8:
      return { apiUrl: nsfwGen, negativePrompt: negativePromptNsfwGen }
    default:
      return { apiUrl: RealisticVision, negativePrompt: negativePromptRealisticVision }
  }
}

const loadNegativePrompt = async() => {
  const _negativePromptRealisticVision = await loadNegativePromptOfModel({key: 'negativePromptRealisticVision'})
  const _negativePromptAnimagine = await loadNegativePromptOfModel({key: 'negativePromptAnimagine'})
  const _negativePromptPony = await loadNegativePromptOfModel({key: 'negativePromptPony'})
  const _negativePromptPvc = await loadNegativePromptOfModel({key: 'negativePromptPvc'})
  const _negativePromptChillOut = await loadNegativePromptOfModel({key: 'negativePromptChillOut'})
  const _negativePromptNsfwGenAnime = await loadNegativePromptOfModel({key: 'negativePromptNsfwGenAnime'})
  const _negativePromptNovelAIRemix = await loadNegativePromptOfModel({key: 'negativePromptNovelAIRemix'})
  const _negativePromptNsfwGen = await loadNegativePromptOfModel({key: 'negativePromptNsfwGen'})
  return {
    _negativePromptRealisticVision,
    _negativePromptAnimagine,
    _negativePromptPony,
    _negativePromptPvc,
    _negativePromptChillOut,
    _negativePromptNsfwGenAnime,
    _negativePromptNovelAIRemix,
    _negativePromptNsfwGen,
  }
}

const loadNegativePromptOfModel = async({key}) => {
  try {
    const res = await storage.load({key})
    return res
  } catch(e) {
    console.log('load negative prompt error key:', key)
    return ''
  }
}

const saveNegativePrompt = async({
  negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
  negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
}) => {
  await storage.save({key: 'negativePromptRealisticVision', data: negativePromptRealisticVision})
  await storage.save({key: 'negativePromptAnimagine', data: negativePromptAnimagine})
  await storage.save({key: 'negativePromptPony', data: negativePromptPony})
  await storage.save({key: 'negativePromptPvc', data: negativePromptPvc})
  await storage.save({key: 'negativePromptChillOut', data: negativePromptChillOut})
  await storage.save({key: 'negativePromptNsfwGenAnime', data: negativePromptNsfwGenAnime})
  await storage.save({key: 'negativePromptNovelAIRemix', data: negativePromptNovelAIRemix})
  await storage.save({key: 'negativePromptNsfwGen', data: negativePromptNsfwGen})
}

const generateTags = async({imagePath}) => {
  try {
    const { imageUrl, viewerUrl } = await uploadFunction({url: imagePath, expiration: 300})
    const requestBody = {
      data: imageUrl,
    }
    const { data } = await axios.post(
      myEndpoints.generateTags,
      requestBody,
      {headers: headers}
    );
    return {message: data, imageUrl: imageUrl}
  } catch(e) {
    console.log('generate tag error', e)
    return {message: errorMessage, imageUrl: null}
  }
}

export {
  generateMessage, generateChatMessage, userIds, errorMessage,
  generateCommandRMessage, userNames, generateImage, loadNegativePrompt,
  saveNegativePrompt, generateTags,
}