import axios from "axios";
import { palmKey, CO_API_KEY, huggingFaceKey } from "../openaiKeys";
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { convertBlobToImage } from "./downloadFunctions";
import { storage } from "./storage";

const apiUrl = 'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage';
const errorMessage = 'すみません。よくわかりませんでした'

const userIds = {
  user: 1,
  bot1: 2,
  bot2: 3,
  bot3: 4,
}

const userNames = {
  user: 'user',
  bot1: 'gemini',
  bot2: 'commandr',
  bot3: 'image',
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
      const _messages = messages.filter((v) => v.user._id !== userIds.bot2)
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
    const chat_history = formatChatHistory({messages})
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
  text, isImageMode, negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc, negativePromptChillOut
}) => {
  try {
    const { apiUrl, negativePrompt } = selectImageAPI({
      isImageMode, negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc, negativePromptChillOut
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
  isImageMode, negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptChillOut,
}) => {
  const RealisticVision = 'https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4'
  const Animagine = 'https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.1'
  const pony = 'https://api-inference.huggingface.co/models/stablediffusionapi/pony-diffusion-v6-xl'
  const pvc = 'https://api-inference.huggingface.co/models/p1atdev/pvcxl-v1-lora'
  const chillout = 'https://api-inference.huggingface.co/models/Yntec/ChilloutMix'
  switch (isImageMode){
    case 1:
      return { apiUrl: RealisticVision, negativePrompt: negativePromptRealisticVision }
    case 2:
      return { apiUrl: Animagine, negativePrompt: negativePromptAnimagine }
    case 3:
      return { apiUrl: pony, negativePrompt: negativePromptPony }
    case 4:
      return { apiUrl: pvc, negativePrompt: negativePromptPony }
    case 5:
      return { apiUrl: chillout, negativePrompt: negativePromptChillOut }
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
  return {
    _negativePromptRealisticVision,
    _negativePromptAnimagine,
    _negativePromptPony,
    _negativePromptPvc,
    _negativePromptChillOut,
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
  negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc, negativePromptChillOut
}) => {
  await storage.save({key: 'negativePromptRealisticVision', data: negativePromptRealisticVision})
  await storage.save({key: 'negativePromptAnimagine', data: negativePromptAnimagine})
  await storage.save({key: 'negativePromptPony', data: negativePromptPony})
  await storage.save({key: 'negativePromptPvc', data: negativePromptPvc})
  await storage.save({key: 'negativePromptChillOut', data: negativePromptChillOut})
}

export {
  generateMessage, generateChatMessage, userIds,
  generateCommandRMessage, userNames, generateImage, loadNegativePrompt,
  saveNegativePrompt,
}