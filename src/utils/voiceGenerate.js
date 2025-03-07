import { yahooKey } from "../openaiKeys";
import { chupaVoiceEndpoints, convertHiraganaAPI, headers, convertHiraganaYahooAPI } from "../config";
import axios from "axios";
import { errorMessage } from "./textGenerate";
import { convertBase64ToLocalUri } from "./videoFunctions";

const convertText = async({text}) => {
  try {
    const requestBody = {
      id: 'your-request-id', // リクエストを識別するID（任意）
      jsonrpc: '2.0',
      method: 'jlp.furiganaservice.furigana',
      params: {
        q: text, // 変換対象のテキスト
        grade: 1, // 学年レベル (1: 小学校1年生, 2: 小学校2年生, ..., 8: 常用漢字)
        output_type: 'hiragana' // ひらがなで出力（"furigana" を指定するとフリガナ形式で返される）
      }
    };
    const { data } = await axios.post(
      convertHiraganaYahooAPI,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `Yahoo AppID: ${yahooKey}`
        }
      }
    );
    const convertedText = data.result.word.map(item => {
      // ひらがなに変換されたテキストを取得
      if (item.furigana) {
        return item.furigana;
      }
      return item.surface; // 変換されていない部分はそのまま返す
    }).join(' ');
    return convertedText;
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