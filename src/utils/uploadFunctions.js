import axios from "axios";
import { imgbbKey } from "../openaiKeys";
import * as FileSystem from 'expo-file-system';

const uploadFunction = async({url}) => {
  try {
    const base64strings = await FileSystem.readAsStringAsync(url, {
      encoding: FileSystem.EncodingType.Base64
    })
    const formData = new FormData();
    formData.append('image', base64strings);
    const { data } = await axios.post('https://api.imgbb.com/1/upload', formData, {
      params: {
        key: imgbbKey
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const imageUrl = data.data.url
    const viewerUrl = data.data.url_viewer
    return { imageUrl, viewerUrl }
  } catch(e) {
    console.log('upload function error', e)
    throw new Error('upload function error')
  }
}

export { uploadFunction }