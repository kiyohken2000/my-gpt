import axios from "axios";
import { palmKey, CO_API_KEY } from "../openaiKeys";
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const apiUrl = 'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage';
const errorMessage = 'すみません。よくわかりませんでした'

const userIds = {
  user: 1,
  bot1: 2,
  bot2: 3,
}

const userNames = {
  user: 'user',
  bot1: 'gemini',
  bot2: 'commandr',
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

export { generateMessage, generateChatMessage, userIds, generateCommandRMessage, userNames }