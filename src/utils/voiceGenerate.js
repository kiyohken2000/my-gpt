import { gooLabApplicationId } from "../openaiKeys";
import { chupaVoiceEndpoints, convertHiraganaAPI, headers } from "../config";
import axios from "axios";
import { errorMessage } from "./textGenerate";
import { convertBase64ToLocalUri } from "./videoFunctions";

const convertText = async({text}) => {
  try {
    const { data } = await axios.post(
      convertHiraganaAPI,
      {
        app_id: gooLabApplicationId,
        sentence: text,
        output_type: 'hiragana'
      },
      {headers}
    )
    const { converted } = data
    return converted
  } catch(e) {
    console.log('convert text error', e)
    throw new Error('convert text error')
  }
}

const getRandomText = async() => {
  try {
    const { data } = await axios.get(chupaVoiceEndpoints.getRandom)
    return data.random_result
  } catch(e) {
    console.log('get random text error', e)
    throw new Error('get random text error')
  }
}

const generateRandomVoide = async() => {
  try {
    const randomText = await getRandomText()
    const base64StringVideo = await generateCnupaVoice({hiraganaText: randomText})
    const videoUri = await convertBase64ToLocalUri({base64String: base64StringVideo})
    return {
      message: randomText,
      videoUrl: videoUri
    }
  } catch(e) {
    console.log('generate random voice error', e)
    return {
      message: errorMessage,
      videoUrl: null
    }
  }
}

const generateCnupaVoice = async({hiraganaText}) => {
  try {
    const { data } = await axios.post(
      chupaVoiceEndpoints.generateVoice,
      {
        text: hiraganaText,
      },
      {headers}
    )
    return data.video_result
  } catch(e) {
    console.log('generate chupa voice error', e)
    throw new Error('generate chupa voice error')
  }
}

const generateVoice = async({text}) => {
  try {
    const hiraganaText = await convertText({text})
    const base64StringVideo = await generateCnupaVoice({hiraganaText})
    const videoUri = await convertBase64ToLocalUri({base64String: base64StringVideo})
    return {
      message: hiraganaText,
      videoUrl: videoUri
    }
  } catch(e) {
    console.log('generate voice error', e)
    return {
      message: errorMessage,
      videoUrl: null
    }
  }
}

export { generateVoice, generateRandomVoide }