import axios from "axios";
import { palmKey, CO_API_KEY, huggingFaceKey } from "../openaiKeys";
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { convertBlobToImage } from "./downloadFunctions";
import { storage } from "./storage";
import { uploadFunction } from "./uploadFunctions";
import { myEndpoints, headers } from "../config";
import { imageModelData } from "../imageModelData";

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
  negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
  negativePromptYakiDofuMix,
}) => {
  const { apiUrl, negativePrompt, label } = selectImageAPI({
    isImageMode,
    negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
    negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
    negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
    negativePromptYakiDofuMix,
  })
  try {
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
    return { imageUrl: imageUrl, message: `画像は開いた後に長押しで保存できます ${label}`}
  } catch(e) {
    console.log('generate image error', e)
    return { imageUrl: null, message: `${errorMessage}。数分後に再度お試しください。${label}`}
  }
}

const selectImageAPI = ({
  isImageMode,
  negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
  negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
  negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
  negativePromptYakiDofuMix,
}) => {
  switch (isImageMode){
    case imageModelData.RealisticVision.sequence:
      return { apiUrl: imageModelData.RealisticVision.url, negativePrompt: negativePromptRealisticVision, label: imageModelData.RealisticVision.label }
    case imageModelData.Animagine.sequence:
      return { apiUrl: imageModelData.Animagine.url, negativePrompt: negativePromptAnimagine, label: imageModelData.Animagine.label }
    case imageModelData.Pony.sequence:
      return { apiUrl: imageModelData.Pony.url, negativePrompt: negativePromptPony, label: imageModelData.Pony.label }
    case imageModelData.PVC.sequence:
      return { apiUrl: imageModelData.PVC.url, negativePrompt: negativePromptPvc, label: imageModelData.PVC.label }
    case imageModelData.ChilloutMix.sequence:
      return { apiUrl: imageModelData.ChilloutMix.url, negativePrompt: negativePromptChillOut, label: imageModelData.ChilloutMix.label }
    case imageModelData.NsfwGenAnime.sequence:
      return { apiUrl: imageModelData.NsfwGenAnime.url, negativePrompt: negativePromptNsfwGenAnime, label: imageModelData.NsfwGenAnime.label }
    case imageModelData.NovelAIRemix.sequence:
      return { apiUrl: imageModelData.NovelAIRemix.url, negativePrompt: negativePromptNovelAIRemix, label: imageModelData.NovelAIRemix.label }
    case imageModelData.NsfwGen.sequence:
      return { apiUrl: imageModelData.NsfwGen.url, negativePrompt: negativePromptNsfwGen, label: imageModelData.NsfwGen.label }
    case imageModelData.Deliberate.sequence:
      return { apiUrl: imageModelData.Deliberate.url, negativePrompt: negativePromptDeliberate, label: imageModelData.Deliberate.label }
    case imageModelData.RealPony.sequence:
      return { apiUrl: imageModelData.RealPony.url, negativePrompt: negativePromptRealPony, label: imageModelData.RealPony.label }
    case imageModelData.ArtiWaifu.sequence:
      return { apiUrl: imageModelData.ArtiWaifu.url, negativePrompt: negativePromptArtiWaifu, label: imageModelData.ArtiWaifu.label }
    case imageModelData.StarryXL.sequence:
      return { apiUrl: imageModelData.StarryXL.url, negativePrompt: negativePromptStarryXL, label: imageModelData.StarryXL.label }
    case imageModelData.YakiDofuMix.sequence:
      return { apiUrl: imageModelData.YakiDofuMix.url, negativePrompt: negativePromptYakiDofuMix, label: imageModelData.YakiDofuMix.label }
    default:
      return { apiUrl: imageModelData.RealisticVision.url, negativePrompt: negativePromptRealisticVision, label: imageModelData.RealisticVision.label }
  }
}

const loadNegativePrompt = async() => {
  const _negativePromptRealisticVision = await loadNegativePromptOfModel({key: imageModelData.RealisticVision.negativePromptKey})
  const _negativePromptAnimagine = await loadNegativePromptOfModel({key: imageModelData.Animagine.negativePromptKey})
  const _negativePromptPony = await loadNegativePromptOfModel({key: imageModelData.Pony.negativePromptKey})
  const _negativePromptPvc = await loadNegativePromptOfModel({key: imageModelData.PVC.negativePromptKey})
  const _negativePromptChillOut = await loadNegativePromptOfModel({key: imageModelData.ChilloutMix.negativePromptKey})
  const _negativePromptNsfwGenAnime = await loadNegativePromptOfModel({key: imageModelData.NsfwGenAnime.negativePromptKey})
  const _negativePromptNovelAIRemix = await loadNegativePromptOfModel({key: imageModelData.NovelAIRemix.negativePromptKey})
  const _negativePromptNsfwGen = await loadNegativePromptOfModel({key: imageModelData.NsfwGen.negativePromptKey})
  const _negativePromptDeliberate = await loadNegativePromptOfModel({key: imageModelData.Deliberate.negativePromptKey})
  const _negativePromptRealPony = await loadNegativePromptOfModel({key: imageModelData.RealPony.negativePromptKey})
  const _negativePromptArtiWaifu = await loadNegativePromptOfModel({key: imageModelData.ArtiWaifu.negativePromptKey})
  const _negativePromptStarryXL = await loadNegativePromptOfModel({key: imageModelData.StarryXL.negativePromptKey})
  const _negativePromptYakiDofuMix = await loadNegativePromptOfModel({key: imageModelData.YakiDofuMix.negativePromptKey})
  return {
    _negativePromptRealisticVision,
    _negativePromptAnimagine,
    _negativePromptPony,
    _negativePromptPvc,
    _negativePromptChillOut,
    _negativePromptNsfwGenAnime,
    _negativePromptNovelAIRemix,
    _negativePromptNsfwGen,
    _negativePromptDeliberate,
    _negativePromptRealPony,
    _negativePromptArtiWaifu,
    _negativePromptStarryXL,
    _negativePromptYakiDofuMix,
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
  negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
  negativePromptYakiDofuMix,
}) => {
  await storage.save({key: imageModelData.RealisticVision.negativePromptKey, data: negativePromptRealisticVision})
  await storage.save({key: imageModelData.Animagine.negativePromptKey, data: negativePromptAnimagine})
  await storage.save({key: imageModelData.Pony.negativePromptKey, data: negativePromptPony})
  await storage.save({key: imageModelData.PVC.negativePromptKey, data: negativePromptPvc})
  await storage.save({key: imageModelData.ChilloutMix.negativePromptKey, data: negativePromptChillOut})
  await storage.save({key: imageModelData.NsfwGenAnime.negativePromptKey, data: negativePromptNsfwGenAnime})
  await storage.save({key: imageModelData.NovelAIRemix.negativePromptKey, data: negativePromptNovelAIRemix})
  await storage.save({key: imageModelData.NsfwGen.negativePromptKey, data: negativePromptNsfwGen})
  await storage.save({key: imageModelData.Deliberate.negativePromptKey, data: negativePromptDeliberate})
  await storage.save({key: imageModelData.RealPony.negativePromptKey, data: negativePromptRealPony})
  await storage.save({key: imageModelData.ArtiWaifu.negativePromptKey, data: negativePromptArtiWaifu})
  await storage.save({key: imageModelData.StarryXL.negativePromptKey, data: negativePromptStarryXL})
  await storage.save({key: imageModelData.YakiDofuMix.negativePromptKey, data: negativePromptYakiDofuMix})
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