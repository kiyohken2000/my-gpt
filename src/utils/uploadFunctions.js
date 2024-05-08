import axios from "axios";
import { imgbbKey } from "../openaiKeys";
import * as FileSystem from 'expo-file-system';
import { myEndpoints, imgurKey } from "../config";

const uploadFunction = async({url, expiration}) => {
  try {
    const base64strings = await FileSystem.readAsStringAsync(url, {
      encoding: FileSystem.EncodingType.Base64
    })
    const formData = new FormData();
    formData.append('image', base64strings);
    const { data } = await axios.post('https://api.imgbb.com/1/upload', formData, {
      params: {
        expiration,
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

const uploadImgur = async({imagePath}) => {
  try {
    const base64strings = await FileSystem.readAsStringAsync(imagePath, {
      encoding: FileSystem.EncodingType.Base64
    })
    const { data } = await axios.post(
      myEndpoints.imgur,
      {image: base64strings, type: 'base64'},
      {
        headers: {
          Authorization: `Client-ID ${imgurKey.client_id}`
        }
      }
    )
    const videoLink = data.data.link.replace(/.mp4/g, '')
    return {videoUrl: data.data.link, videoLink}
  } catch(e) {
    console.log('upload imgur error', e)
    throw new Error('upload imgur error')
  }
}

export { uploadFunction, uploadImgur }