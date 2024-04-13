import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { showToast } from './showToast';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const saveImage = async({url, fileName}) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if(status === 'granted') {
      await MediaLibrary.saveToLibraryAsync(url)
      showToast({title: '保存しました'})
    }
  } catch(e) {
    console.log('save image error:', e)
    showToast({title: '保存に失敗しました'})
  }
}

const convertBlobToImage = async({blob}) => {
  try {
    const res = await request(blob)
    const res2 = await toDataURI(res)
    const base64Code = removeDataURIPrefix(res2)
    const base64image = `data:image/jpeg;base64,${base64Code}`
    const { uri } = await manipulateAsync(
      base64image,
      [],
      { compress: 1, format: SaveFormat.JPEG }
    );
    return uri
  } catch(e) {
    throw new Error('convert blob to image error');
  }
}

const request = (url, data) =>
  new Promise((resolve) => {
    const req = new XMLHttpRequest();

    req.open('POST', url, true);
    req.responseType = 'blob';

    req.onload = () => {
      // At this point, req.response is a Blob.
      resolve(req.response);
    };

    req.send(data);
  });

const toDataURI = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const uri = reader.result?.toString();
      resolve(uri);
    };
  });

const removeDataURIPrefix = (dataURI) => {
  return dataURI.replace(/^data:.*?;base64,/, '');
};


export { saveImage, convertBlobToImage }