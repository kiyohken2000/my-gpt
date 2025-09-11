import axios from "axios";
import { palmKey, CO_API_KEY, huggingFaceKey } from "../openaiKeys";
import * as FileSystem from 'expo-file-system/legacy';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { convertBlobToImage, convertBase64toImage } from "./downloadFunctions";
import { storage } from "./storage";
import { uploadFunction } from "./uploadFunctions";
import { myEndpoints, headers, zeroGPUUrls, zeroGPUUrl } from "../config";
import { imageModelData } from "../imageModelData";

const errorMessage = 'すみません。よくわかりませんでした'
const geminiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key='
// const geminiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='
// const geminiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='

const userIds = {
  user: 1,
  bot1: 2,
  bot2: 3,
  bot3: 4,
  bot4: 5,
  bot5: 6,
  bot6: 7,
  bot7: 8,
}

const userNames = {
  user: 'user',
  bot1: 'gemini',
  bot2: 'commandr',
  bot3: 'image',
  bot4: 'video',
  bot5: 'prompts',
  bot6: 'song',
  bot7: 'voice',
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
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${palmKey}`,
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
        geminiBaseUrl + palmKey,
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
  negativePromptYakiDofuMix, negativePromptEbaraPony, negativePromptWaiANIMIXPONYXL, negativePromptWaiREALMIX,
  negativePromptAnythingXL, negativePromptWaiREALCN, negativePromptAnimeBulldozer, negativePromptMomoiroPony,
  negativePromptHanamomoPony, negativePromptDeepDarkHentaiMix, negativePromptSeventhAnimeXLPony, negativePromptRealPonyCuteJp,
  negativePromptRumblexl, negativePromptMix3x3x3xl, negativePromptYamersAnime, negativePromptBaxl,
  negativePromptCuteCore, negativePromptFeaturelessMix, negativePromptManmaruMix, negativePromptChacolOmegaMix,
  negativePromptEponaMix, negativePromptPVCMovable, negativePromptPVCRealistic, negativePromptPVCFantasy,
  negativePromptHolodayoXL, negativePromptKivotosXL, negativePromptJuggernautXL, negativePromptNovaAnimeXL,
  negativePromptWaiNSFWIllustrious, negativePromptShiitakeMix, negativePromptNoobreal, negativePromptMatureRitual,
  negativePromptRedcraft, negativePromptNovaFurryXL, negativePromptPornMasterPro,
}) => {
  const { apiUrl, negativePrompt, label } = selectImageAPI({
    isImageMode,
    negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
    negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
    negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
    negativePromptYakiDofuMix, negativePromptEbaraPony, negativePromptWaiANIMIXPONYXL, negativePromptWaiREALMIX,
    negativePromptAnythingXL, negativePromptWaiREALCN, negativePromptAnimeBulldozer, negativePromptMomoiroPony,
    negativePromptHanamomoPony, negativePromptDeepDarkHentaiMix, negativePromptSeventhAnimeXLPony, negativePromptRealPonyCuteJp,
    negativePromptRumblexl, negativePromptMix3x3x3xl, negativePromptYamersAnime, negativePromptBaxl,
    negativePromptCuteCore, negativePromptFeaturelessMix, negativePromptManmaruMix, negativePromptChacolOmegaMix,
    negativePromptEponaMix, negativePromptPVCMovable, negativePromptPVCRealistic, negativePromptPVCFantasy,
    negativePromptHolodayoXL, negativePromptKivotosXL, negativePromptJuggernautXL, negativePromptNovaAnimeXL,
    negativePromptWaiNSFWIllustrious, negativePromptShiitakeMix, negativePromptNoobreal, negativePromptMatureRitual,
    negativePromptRedcraft, negativePromptNovaFurryXL, negativePromptPornMasterPro,
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
    console.log('generate image error', )
    return { imageUrl: null, message: `${errorMessage}。数分後に再度お試しください。エラー:${e.response.status} ${label} `}
  }
}

const getRandomZeroGPUUrl = () => {
  const randomIndex = Math.floor(Math.random() * zeroGPUUrls.length);
  return zeroGPUUrls[randomIndex];
};

const generateImageFromZeroGPU = async({
  text, isImageMode,
  negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
  negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
  negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
  negativePromptYakiDofuMix, negativePromptEbaraPony, negativePromptWaiANIMIXPONYXL, negativePromptWaiREALMIX,
  negativePromptAnythingXL, negativePromptWaiREALCN, negativePromptAnimeBulldozer, negativePromptMomoiroPony,
  negativePromptHanamomoPony, negativePromptDeepDarkHentaiMix, negativePromptSeventhAnimeXLPony, negativePromptRealPonyCuteJp,
  negativePromptRumblexl, negativePromptMix3x3x3xl, negativePromptYamersAnime, negativePromptBaxl,
  negativePromptCuteCore, negativePromptFeaturelessMix, negativePromptManmaruMix, negativePromptChacolOmegaMix,
  negativePromptEponaMix, negativePromptPVCMovable, negativePromptPVCRealistic, negativePromptPVCFantasy,
  negativePromptHolodayoXL, negativePromptKivotosXL, negativePromptJuggernautXL, negativePromptNovaAnimeXL,
  negativePromptWaiNSFWIllustrious, negativePromptShiitakeMix, negativePromptNoobreal, negativePromptMatureRitual,
  negativePromptRedcraft, negativePromptNovaFurryXL, negativePromptPornMasterPro,
}) => {
  const { negativePrompt, label, modelName } = selectImageAPI({
    isImageMode,
    negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
    negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
    negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
    negativePromptYakiDofuMix, negativePromptEbaraPony, negativePromptWaiANIMIXPONYXL, negativePromptWaiREALMIX,
    negativePromptAnythingXL, negativePromptWaiREALCN, negativePromptAnimeBulldozer, negativePromptMomoiroPony,
    negativePromptHanamomoPony, negativePromptDeepDarkHentaiMix, negativePromptSeventhAnimeXLPony, negativePromptRealPonyCuteJp,
    negativePromptRumblexl, negativePromptMix3x3x3xl, negativePromptYamersAnime, negativePromptBaxl,
    negativePromptCuteCore, negativePromptFeaturelessMix, negativePromptManmaruMix, negativePromptChacolOmegaMix,
    negativePromptEponaMix, negativePromptPVCMovable, negativePromptPVCRealistic, negativePromptPVCFantasy,
    negativePromptHolodayoXL, negativePromptKivotosXL, negativePromptJuggernautXL, negativePromptNovaAnimeXL,
    negativePromptWaiNSFWIllustrious, negativePromptShiitakeMix, negativePromptNoobreal, negativePromptMatureRitual,
    negativePromptRedcraft, negativePromptNovaFurryXL, negativePromptPornMasterPro,
  })
  const imageEndpoint = getRandomZeroGPUUrl()
  try {
    const { data } = await axios.post(
      imageEndpoint,
      {
        model: modelName,
        prompt: text,
        negative_prompt: negativePrompt,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    const imageUrl = await convertBase64toImage({base64image: data.image})
    return { imageUrl: imageUrl, message: `画像は開いた後に長押しで保存できます ${label}`}
  } catch(e) {
    console.log('generate image from zero gpu error', e)
    return { imageUrl: null, message: `${errorMessage}。数分後に再度お試しください。エラー:${e.response.status} ${label} `}
  }
}

const selectImageAPI = ({
  isImageMode,
  negativePromptRealisticVision, negativePromptAnimagine, negativePromptPony, negativePromptPvc,
  negativePromptChillOut, negativePromptNsfwGenAnime, negativePromptNovelAIRemix, negativePromptNsfwGen,
  negativePromptDeliberate, negativePromptRealPony, negativePromptArtiWaifu, negativePromptStarryXL,
  negativePromptYakiDofuMix, negativePromptEbaraPony, negativePromptWaiANIMIXPONYXL, negativePromptWaiREALMIX,
  negativePromptAnythingXL, negativePromptWaiREALCN, negativePromptAnimeBulldozer, negativePromptMomoiroPony,
  negativePromptHanamomoPony, negativePromptDeepDarkHentaiMix, negativePromptSeventhAnimeXLPony, negativePromptRealPonyCuteJp,
  negativePromptRumblexl, negativePromptMix3x3x3xl, negativePromptYamersAnime, negativePromptBaxl,
  negativePromptCuteCore, negativePromptFeaturelessMix, negativePromptManmaruMix, negativePromptChacolOmegaMix,
  negativePromptEponaMix, negativePromptPVCMovable, negativePromptPVCRealistic, negativePromptPVCFantasy,
  negativePromptHolodayoXL, negativePromptKivotosXL, negativePromptJuggernautXL, negativePromptNovaAnimeXL,
  negativePromptWaiNSFWIllustrious, negativePromptShiitakeMix, negativePromptNoobreal, negativePromptMatureRitual,
  negativePromptRedcraft, negativePromptNovaFurryXL, negativePromptPornMasterPro,
}) => {
  switch (isImageMode){
    case imageModelData.RealisticVision.sequence:
      return { apiUrl: imageModelData.RealisticVision.url, negativePrompt: negativePromptRealisticVision, label: imageModelData.RealisticVision.label, modelName: imageModelData.RealisticVision.modelName }
    case imageModelData.Animagine.sequence:
      return { apiUrl: imageModelData.Animagine.url, negativePrompt: negativePromptAnimagine, label: imageModelData.Animagine.label, modelName: imageModelData.Animagine.modelName }
    case imageModelData.Pony.sequence:
      return { apiUrl: imageModelData.Pony.url, negativePrompt: negativePromptPony, label: imageModelData.Pony.label, modelName: imageModelData.Pony.modelName }
    case imageModelData.PVC.sequence:
      return { apiUrl: imageModelData.PVC.url, negativePrompt: negativePromptPvc, label: imageModelData.PVC.label, modelName: imageModelData.PVC.modelName }
    case imageModelData.ChilloutMix.sequence:
      return { apiUrl: imageModelData.ChilloutMix.url, negativePrompt: negativePromptChillOut, label: imageModelData.ChilloutMix.label, modelName: imageModelData.ChilloutMix.modelName }
    case imageModelData.NsfwGenAnime.sequence:
      return { apiUrl: imageModelData.NsfwGenAnime.url, negativePrompt: negativePromptNsfwGenAnime, label: imageModelData.NsfwGenAnime.label, modelName: imageModelData.NsfwGenAnime.modelName }
    case imageModelData.NovelAIRemix.sequence:
      return { apiUrl: imageModelData.NovelAIRemix.url, negativePrompt: negativePromptNovelAIRemix, label: imageModelData.NovelAIRemix.label, modelName: imageModelData.NovelAIRemix.modelName }
    case imageModelData.NsfwGen.sequence:
      return { apiUrl: imageModelData.NsfwGen.url, negativePrompt: negativePromptNsfwGen, label: imageModelData.NsfwGen.label, modelName: imageModelData.NsfwGen.modelName }
    case imageModelData.Deliberate.sequence:
      return { apiUrl: imageModelData.Deliberate.url, negativePrompt: negativePromptDeliberate, label: imageModelData.Deliberate.label, modelName: imageModelData.Deliberate.modelName }
    case imageModelData.RealPony.sequence:
      return { apiUrl: imageModelData.RealPony.url, negativePrompt: negativePromptRealPony, label: imageModelData.RealPony.label, modelName: imageModelData.RealPony.modelName }
    case imageModelData.ArtiWaifu.sequence:
      return { apiUrl: imageModelData.ArtiWaifu.url, negativePrompt: negativePromptArtiWaifu, label: imageModelData.ArtiWaifu.label, modelName: imageModelData.ArtiWaifu.modelName }
    case imageModelData.StarryXL.sequence:
      return { apiUrl: imageModelData.StarryXL.url, negativePrompt: negativePromptStarryXL, label: imageModelData.StarryXL.label, modelName: imageModelData.StarryXL.modelName }
    case imageModelData.YakiDofuMix.sequence:
      return { apiUrl: imageModelData.YakiDofuMix.url, negativePrompt: negativePromptYakiDofuMix, label: imageModelData.YakiDofuMix.label, modelName: imageModelData.YakiDofuMix.modelName }
    case imageModelData.EbaraPony.sequence:
      return { apiUrl: imageModelData.EbaraPony.url, negativePrompt: negativePromptEbaraPony, label: imageModelData.EbaraPony.label, modelName: imageModelData.EbaraPony.modelName }
    case imageModelData.waiANIMIXPONYXL.sequence:
      return { apiUrl: imageModelData.waiANIMIXPONYXL.url, negativePrompt: negativePromptWaiANIMIXPONYXL, label: imageModelData.waiANIMIXPONYXL.label, modelName: imageModelData.waiANIMIXPONYXL.modelName }
    case imageModelData.waiREALMIX.sequence:
      return { apiUrl: imageModelData.waiREALMIX.url, negativePrompt: negativePromptWaiREALMIX, label: imageModelData.waiREALMIX.label, modelName: imageModelData.waiREALMIX.modelName }
    case imageModelData.AnythingXL.sequence:
      return { apiUrl: imageModelData.AnythingXL.url, negativePrompt: negativePromptAnythingXL, label: imageModelData.AnythingXL.label, modelName: imageModelData.AnythingXL.modelName }
    case imageModelData.waiREALCN.sequence:
      return { apiUrl: imageModelData.waiREALCN.url, negativePrompt: negativePromptWaiREALCN, label: imageModelData.waiREALCN.label, modelName: imageModelData.waiREALCN.modelName }
    case imageModelData.AnimeBulldozer.sequence:
      return { apiUrl: imageModelData.AnimeBulldozer.url, negativePrompt: negativePromptAnimeBulldozer, label: imageModelData.AnimeBulldozer.label, modelName: imageModelData.AnimeBulldozer.modelName }
    case imageModelData.MomoiroPony.sequence:
      return { apiUrl: imageModelData.MomoiroPony.url, negativePrompt: negativePromptMomoiroPony, label: imageModelData.MomoiroPony.label, modelName: imageModelData.MomoiroPony.modelName }
    case imageModelData.HanamomoPony.sequence:
      return { apiUrl: imageModelData.HanamomoPony.url, negativePrompt: negativePromptHanamomoPony, label: imageModelData.HanamomoPony.label, modelName: imageModelData.HanamomoPony.modelName }
    case imageModelData.DeepDarkHentaiMix.sequence:
      return { apiUrl: imageModelData.DeepDarkHentaiMix.url, negativePrompt: negativePromptDeepDarkHentaiMix, label: imageModelData.DeepDarkHentaiMix.label, modelName: imageModelData.DeepDarkHentaiMix.modelName }
    case imageModelData.SeventhAnimeXLPony.sequence:
      return { apiUrl: imageModelData.SeventhAnimeXLPony.url, negativePrompt: negativePromptSeventhAnimeXLPony, label: imageModelData.SeventhAnimeXLPony.label, modelName: imageModelData.SeventhAnimeXLPony.modelName }
    case imageModelData.RealPonyCuteJp.sequence:
      return { apiUrl: imageModelData.RealPonyCuteJp.url, negativePrompt: negativePromptRealPonyCuteJp, label: imageModelData.RealPonyCuteJp.label, modelName: imageModelData.RealPonyCuteJp.modelName }
    case imageModelData.Rumblexl.sequence:
      return { apiUrl: imageModelData.Rumblexl.url, negativePrompt: negativePromptRumblexl, label: imageModelData.Rumblexl.label, modelName: imageModelData.Rumblexl.modelName }
    case imageModelData.Mix3x3x3xl.sequence:
      return { apiUrl: imageModelData.Mix3x3x3xl.url, negativePrompt: negativePromptMix3x3x3xl, label: imageModelData.Mix3x3x3xl.label, modelName: imageModelData.Mix3x3x3xl.modelName }
    case imageModelData.YamersAnime.sequence:
      return { apiUrl: imageModelData.YamersAnime.url, negativePrompt: negativePromptYamersAnime, label: imageModelData.YamersAnime.label, modelName: imageModelData.YamersAnime.modelName }
    case imageModelData.Baxl.sequence:
      return { apiUrl: imageModelData.Baxl.url, negativePrompt: negativePromptBaxl, label: imageModelData.Baxl.label, modelName: imageModelData.Baxl.modelName }
    case imageModelData.CuteCore.sequence:
      return { apiUrl: imageModelData.CuteCore.url, negativePrompt: negativePromptCuteCore, label: imageModelData.CuteCore.label, modelName: imageModelData.CuteCore.modelName }
    case imageModelData.FeaturelessMix.sequence:
      return { apiUrl: imageModelData.FeaturelessMix.url, negativePrompt: negativePromptFeaturelessMix, label: imageModelData.FeaturelessMix.label, modelName: imageModelData.FeaturelessMix.modelName }
    case imageModelData.ManmaruMix.sequence:
      return { apiUrl: imageModelData.ManmaruMix.url, negativePrompt: negativePromptManmaruMix, label: imageModelData.ManmaruMix.label, modelName: imageModelData.ManmaruMix.modelName }
    case imageModelData.ChacolOmegaMix.sequence:
      return { apiUrl: imageModelData.ChacolOmegaMix.url, negativePrompt: negativePromptChacolOmegaMix, label: imageModelData.ChacolOmegaMix.label, modelName: imageModelData.ChacolOmegaMix.modelName }
    case imageModelData.EponaMix.sequence:
      return { apiUrl: imageModelData.EponaMix.url, negativePrompt: negativePromptEponaMix, label: imageModelData.EponaMix.label, modelName: imageModelData.EponaMix.modelName }
    case imageModelData.PVCMovable.sequence:
      return { apiUrl: imageModelData.PVCMovable.url, negativePrompt: negativePromptPVCMovable, label: imageModelData.PVCMovable.label, modelName: imageModelData.PVCMovable.modelName }
    case imageModelData.PVCRealistic.sequence:
      return { apiUrl: imageModelData.PVCRealistic.url, negativePrompt: negativePromptPVCRealistic, label: imageModelData.PVCRealistic.label, modelName: imageModelData.PVCRealistic.modelName }
    case imageModelData.PVCFantasy.sequence:
      return { apiUrl: imageModelData.PVCFantasy.url, negativePrompt: negativePromptPVCFantasy, label: imageModelData.PVCFantasy.label, modelName: imageModelData.PVCFantasy.modelName }
    case imageModelData.HolodayoXL.sequence:
      return { apiUrl: imageModelData.HolodayoXL.url, negativePrompt: negativePromptHolodayoXL, label: imageModelData.HolodayoXL.label, modelName: imageModelData.HolodayoXL.modelName }
    case imageModelData.KivotosXL.sequence:
      return { apiUrl: imageModelData.KivotosXL.url, negativePrompt: negativePromptKivotosXL, label: imageModelData.KivotosXL.label, modelName: imageModelData.KivotosXL.modelName }
    case imageModelData.JuggernautXL.sequence:
      return { apiUrl: imageModelData.JuggernautXL.url, negativePrompt: negativePromptJuggernautXL, label: imageModelData.JuggernautXL.label, modelName: imageModelData.JuggernautXL.modelName }
    case imageModelData.NovaAnimeXL.sequence:
      return { apiUrl: imageModelData.NovaAnimeXL.url, negativePrompt: negativePromptNovaAnimeXL, label: imageModelData.NovaAnimeXL.label, modelName: imageModelData.NovaAnimeXL.modelName }
    case imageModelData.WaiNSFWIllustrious.sequence:
      return { apiUrl: imageModelData.WaiNSFWIllustrious.url, negativePrompt: negativePromptWaiNSFWIllustrious, label: imageModelData.WaiNSFWIllustrious.label, modelName: imageModelData.WaiNSFWIllustrious.modelName }
    case imageModelData.ShiitakeMix.sequence:
      return { apiUrl: imageModelData.ShiitakeMix.url, negativePrompt: negativePromptShiitakeMix, label: imageModelData.ShiitakeMix.label, modelName: imageModelData.ShiitakeMix.modelName }
    case imageModelData.Noobreal.sequence:
      return { apiUrl: imageModelData.Noobreal.url, negativePrompt: negativePromptNoobreal, label: imageModelData.Noobreal.label, modelName: imageModelData.Noobreal.modelName }
    case imageModelData.MatureRitual.sequence:
      return { apiUrl: imageModelData.MatureRitual.url, negativePrompt: negativePromptMatureRitual, label: imageModelData.MatureRitual.label, modelName: imageModelData.MatureRitual.modelName }
    case imageModelData.Redcraft.sequence:
      return { apiUrl: imageModelData.Redcraft.url, negativePrompt: negativePromptRedcraft, label: imageModelData.Redcraft.label, modelName: imageModelData.Redcraft.modelName }
    case imageModelData.NovaFurryXL.sequence:
      return { apiUrl: imageModelData.NovaFurryXL.url, negativePrompt: negativePromptNovaFurryXL, label: imageModelData.NovaFurryXL.label, modelName: imageModelData.NovaFurryXL.modelName }
    case imageModelData.PornMasterPro.sequence:
      return { apiUrl: imageModelData.PornMasterPro.url, negativePrompt: negativePromptPornMasterPro, label: imageModelData.PornMasterPro.label, modelName: imageModelData.PornMasterPro.modelName }
    default:
      return { apiUrl: imageModelData.RealisticVision.url, negativePrompt: negativePromptRealisticVision, label: imageModelData.RealisticVision.label, modelName: imageModelData.RealisticVision.modelName }
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
  const _negativePromptEbaraPony = await loadNegativePromptOfModel({key: imageModelData.EbaraPony.negativePromptKey})
  const _negativePromptWaiANIMIXPONYXL = await loadNegativePromptOfModel({key: imageModelData.waiANIMIXPONYXL.negativePromptKey})
  const _negativePromptWaiREALMIX = await loadNegativePromptOfModel({key: imageModelData.waiREALMIX.negativePromptKey})
  const _negativePromptAnythingXL = await loadNegativePromptOfModel({key: imageModelData.AnythingXL.negativePromptKey})
  const _negativePromptWaiREALCN = await loadNegativePromptOfModel({key: imageModelData.waiREALCN.negativePromptKey})
  const _negativePromptAnimeBulldozer = await loadNegativePromptOfModel({key: imageModelData.AnimeBulldozer.negativePromptKey})
  const _negativePromptMomoiroPony = await loadNegativePromptOfModel({key: imageModelData.MomoiroPony.negativePromptKey})
  const _negativePromptHanamomoPony = await loadNegativePromptOfModel({key: imageModelData.HanamomoPony.negativePromptKey})
  const _negativePromptDeepDarkHentaiMix = await loadNegativePromptOfModel({key: imageModelData.DeepDarkHentaiMix.negativePromptKey})
  const _negativePromptSeventhAnimeXLPony = await loadNegativePromptOfModel({key: imageModelData.SeventhAnimeXLPony.negativePromptKey})
  const _negativePromptRealPonyCuteJp = await loadNegativePromptOfModel({key: imageModelData.RealPonyCuteJp.negativePromptKey})
  const _negativePromptRumblexl = await loadNegativePromptOfModel({key: imageModelData.Rumblexl.negativePromptKey})
  const _negativePromptMix3x3x3xl = await loadNegativePromptOfModel({key: imageModelData.Mix3x3x3xl.negativePromptKey})
  const _negativePromptYamersAnime = await loadNegativePromptOfModel({key: imageModelData.YamersAnime.negativePromptKey})
  const _negativePromptBaxl = await loadNegativePromptOfModel({key: imageModelData.Baxl.negativePromptKey})
  const _negativePromptCuteCore = await loadNegativePromptOfModel({key: imageModelData.CuteCore.negativePromptKey})
  const _negativePromptFeaturelessMix = await loadNegativePromptOfModel({key: imageModelData.FeaturelessMix.negativePromptKey})
  const _negativePromptManmaruMix = await loadNegativePromptOfModel({key: imageModelData.ManmaruMix.negativePromptKey})
  const _negativePromptChacolOmegaMix = await loadNegativePromptOfModel({key: imageModelData.ChacolOmegaMix.negativePromptKey})
  const _negativePromptEponaMix = await loadNegativePromptOfModel({key: imageModelData.EponaMix.negativePromptKey})
  const _negativePromptPVCMovable = await loadNegativePromptOfModel({key: imageModelData.PVCMovable.negativePromptKey})
  const _negativePromptPVCRealistic = await loadNegativePromptOfModel({key: imageModelData.PVCRealistic.negativePromptKey})
  const _negativePromptPVCFantasy = await loadNegativePromptOfModel({key: imageModelData.PVCFantasy.negativePromptKey})
  const _negativePromptHolodayoXL = await loadNegativePromptOfModel({key: imageModelData.HolodayoXL.negativePromptKey})
  const _negativePromptKivotosXL = await loadNegativePromptOfModel({key: imageModelData.KivotosXL.negativePromptKey})
  const _negativePromptJuggernautXL = await loadNegativePromptOfModel({key: imageModelData.JuggernautXL.negativePromptKey})
  const _negativePromptNovaAnimeXL = await loadNegativePromptOfModel({key: imageModelData.NovaAnimeXL.negativePromptKey})
  const _negativePromptWaiNSFWIllustrious = await loadNegativePromptOfModel({key: imageModelData.WaiNSFWIllustrious.negativePromptKey})
  const _negativePromptShiitakeMix = await loadNegativePromptOfModel({key: imageModelData.ShiitakeMix.negativePromptKey})
  const _negativePromptNoobreal = await loadNegativePromptOfModel({key: imageModelData.Noobreal.negativePromptKey})
  const _negativePromptMatureRitual = await loadNegativePromptOfModel({key: imageModelData.MatureRitual.negativePromptKey})
  const _negativePromptRedcraft = await loadNegativePromptOfModel({key: imageModelData.Redcraft.negativePromptKey})
  const _negativePromptNovaFurryXL = await loadNegativePromptOfModel({key: imageModelData.NovaFurryXL.negativePromptKey})
  const _negativePromptPornMasterPro = await loadNegativePromptOfModel({key: imageModelData.PornMasterPro.negativePromptKey})
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
    _negativePromptEbaraPony,
    _negativePromptWaiANIMIXPONYXL,
    _negativePromptWaiREALMIX,
    _negativePromptAnythingXL,
    _negativePromptWaiREALCN,
    _negativePromptAnimeBulldozer,
    _negativePromptMomoiroPony,
    _negativePromptHanamomoPony,
    _negativePromptDeepDarkHentaiMix,
    _negativePromptSeventhAnimeXLPony,
    _negativePromptRealPonyCuteJp,
    _negativePromptRumblexl,
    _negativePromptMix3x3x3xl,
    _negativePromptYamersAnime,
    _negativePromptBaxl,
    _negativePromptCuteCore,
    _negativePromptFeaturelessMix,
    _negativePromptManmaruMix,
    _negativePromptChacolOmegaMix,
    _negativePromptEponaMix,
    _negativePromptPVCMovable,
    _negativePromptPVCRealistic,
    _negativePromptPVCFantasy,
    _negativePromptHolodayoXL,
    _negativePromptKivotosXL,
    _negativePromptJuggernautXL,
    _negativePromptNovaAnimeXL,
    _negativePromptWaiNSFWIllustrious,
    _negativePromptShiitakeMix,
    _negativePromptNoobreal,
    _negativePromptMatureRitual,
    _negativePromptRedcraft,
    _negativePromptNovaFurryXL,
    _negativePromptPornMasterPro,
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
  negativePromptYakiDofuMix, negativePromptEbaraPony, negativePromptWaiANIMIXPONYXL, negativePromptWaiREALMIX,
  negativePromptAnythingXL, negativePromptWaiREALCN, negativePromptAnimeBulldozer, negativePromptMomoiroPony,
  negativePromptHanamomoPony, negativePromptDeepDarkHentaiMix, negativePromptSeventhAnimeXLPony, negativePromptRealPonyCuteJp,
  negativePromptRumblexl, negativePromptMix3x3x3xl, negativePromptYamersAnime, negativePromptBaxl,
  negativePromptCuteCore, negativePromptFeaturelessMix, negativePromptManmaruMix, negativePromptChacolOmegaMix,
  negativePromptEponaMix, negativePromptPVCMovable, negativePromptPVCRealistic, negativePromptPVCFantasy,
  negativePromptHolodayoXL, negativePromptKivotosXL, negativePromptJuggernautXL, negativePromptNovaAnimeXL,
  negativePromptWaiNSFWIllustrious, negativePromptShiitakeMix, negativePromptNoobreal, negativePromptMatureRitual,
  negativePromptRedcraft, negativePromptNovaFurryXL, negativePromptPornMasterPro,
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
  await storage.save({key: imageModelData.EbaraPony.negativePromptKey, data: negativePromptEbaraPony})
  await storage.save({key: imageModelData.waiANIMIXPONYXL.negativePromptKey, data: negativePromptWaiANIMIXPONYXL})
  await storage.save({key: imageModelData.waiREALMIX.negativePromptKey, data: negativePromptWaiREALMIX})
  await storage.save({key: imageModelData.AnythingXL.negativePromptKey, data: negativePromptAnythingXL})
  await storage.save({key: imageModelData.waiREALCN.negativePromptKey, data: negativePromptWaiREALCN})
  await storage.save({key: imageModelData.AnimeBulldozer.negativePromptKey, data: negativePromptAnimeBulldozer})
  await storage.save({key: imageModelData.MomoiroPony.negativePromptKey, data: negativePromptMomoiroPony})
  await storage.save({key: imageModelData.HanamomoPony.negativePromptKey, data: negativePromptHanamomoPony})
  await storage.save({key: imageModelData.DeepDarkHentaiMix.negativePromptKey, data: negativePromptDeepDarkHentaiMix})
  await storage.save({key: imageModelData.SeventhAnimeXLPony.negativePromptKey, data: negativePromptSeventhAnimeXLPony})
  await storage.save({key: imageModelData.RealPonyCuteJp.negativePromptKey, data: negativePromptRealPonyCuteJp})
  await storage.save({key: imageModelData.Rumblexl.negativePromptKey, data: negativePromptRumblexl})
  await storage.save({key: imageModelData.Mix3x3x3xl.negativePromptKey, data: negativePromptMix3x3x3xl})
  await storage.save({key: imageModelData.YamersAnime.negativePromptKey, data: negativePromptYamersAnime})
  await storage.save({key: imageModelData.Baxl.negativePromptKey, data: negativePromptBaxl})
  await storage.save({key: imageModelData.CuteCore.negativePromptKey, data: negativePromptCuteCore})
  await storage.save({key: imageModelData.FeaturelessMix.negativePromptKey, data: negativePromptFeaturelessMix})
  await storage.save({key: imageModelData.ManmaruMix.negativePromptKey, data: negativePromptManmaruMix})
  await storage.save({key: imageModelData.ChacolOmegaMix.negativePromptKey, data: negativePromptChacolOmegaMix})
  await storage.save({key: imageModelData.EponaMix.negativePromptKey, data: negativePromptEponaMix})
  await storage.save({key: imageModelData.PVCMovable.negativePromptKey, data: negativePromptPVCMovable})
  await storage.save({key: imageModelData.PVCRealistic.negativePromptKey, data: negativePromptPVCRealistic})
  await storage.save({key: imageModelData.PVCFantasy.negativePromptKey, data: negativePromptPVCFantasy})
  await storage.save({key: imageModelData.HolodayoXL.negativePromptKey, data: negativePromptHolodayoXL})
  await storage.save({key: imageModelData.KivotosXL.negativePromptKey, data: negativePromptKivotosXL})
  await storage.save({key: imageModelData.JuggernautXL.negativePromptKey, data: negativePromptJuggernautXL})
  await storage.save({key: imageModelData.NovaAnimeXL.negativePromptKey, data: negativePromptNovaAnimeXL})
  await storage.save({key: imageModelData.WaiNSFWIllustrious.negativePromptKey, data: negativePromptWaiNSFWIllustrious})
  await storage.save({key: imageModelData.ShiitakeMix.negativePromptKey, data: negativePromptShiitakeMix})
  await storage.save({key: imageModelData.Noobreal.negativePromptKey, data: negativePromptNoobreal})
  await storage.save({key: imageModelData.MatureRitual.negativePromptKey, data: negativePromptMatureRitual})
  await storage.save({key: imageModelData.Redcraft.negativePromptKey, data: negativePromptRedcraft})
  await storage.save({key: imageModelData.NovaFurryXL.negativePromptKey, data: negativePromptNovaFurryXL})
  await storage.save({key: imageModelData.PornMasterPro.negativePromptKey, data: negativePromptPornMasterPro})
}

const generateTags = async({imagePath, imgbbKey}) => {
  try {
    const { imageUrl, viewerUrl } = await uploadFunction({url: imagePath, expiration: 300, imgbbKey})
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
  generateChatMessage, userIds, errorMessage,
  generateCommandRMessage, userNames, generateImage, loadNegativePrompt,
  saveNegativePrompt, generateTags, generateImageFromZeroGPU
}