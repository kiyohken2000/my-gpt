import { Platform } from 'react-native';
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

const convertBase64toImage = async({base64image}) => {
  const { uri } = await manipulateAsync(
    base64image,
    [],
    { compress: 1, format: SaveFormat.PNG }
  );
  return uri
}

const convertBlobToImage = async({data}) => {
  try {
    if(Platform.OS === 'ios') {
      const url = URL.createObjectURL(new Blob([data]));
      const res = await request(url)
      const res2 = await toDataURI(res)
      const base64Code = removeDataURIPrefix(res2)
      const base64image = `data:image/jpeg;base64,${base64Code}`
      const { uri } = await manipulateAsync(
        base64image,
        [],
        { compress: 1, format: SaveFormat.JPEG }
      );
      return uri
    } else if(Platform.OS === 'android') {
      const base64string = await convertBlobToBase64({data})
      const base64Code = removeDataURIPrefix(base64string)
      const base64image = `data:image/jpeg;base64,${base64Code}`
      const { uri } = await manipulateAsync(
        base64image,
        [],
        { compress: 1, format: SaveFormat.JPEG }
      );
      return uri
    } else {
      throw new Error('convert blob to image error');
    }
  } catch(e) {
    throw new Error('convert blob to image error');
  }
}

const convertBlobToBase64 = async({data}) => {
  return new Promise((resolve, reject) => {
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(data);
    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result;
      resolve(base64data);
    };
    fileReaderInstance.onerror = (error) => {
      reject(error);
    };
  });
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


export { saveImage, convertBlobToImage, convertBase64toImage }