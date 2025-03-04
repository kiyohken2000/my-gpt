import { novitaaiKey, viduKey } from "../openaiKeys";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { sleep } from "./utilFunctions";
import { errorMessage } from "./textGenerate";
import * as MediaLibrary from 'expo-media-library';
import moment from "moment";
import { uploadImageImgur } from "./uploadFunctions";
import { saveFirestore } from "./uploadFunctions";

const MAX_RETRIES = 30;
const RETRY_DELAY = 20000;

const createVideo = async({url}) => {
   try {
    const imageUrl = await uploadImageImgur({imagePath: url})
    const payload = {
      model: 'vidu2.0',
      images: [imageUrl],
      resolution: "720p",
      duration: '4',
      movement_amplitude: 'auto'
    };
    const API_URL = 'https://api.vidu.com/ent/v2/img2video';
    const { data } = await axios.post(
      API_URL,
      payload, {
      headers: {
        'Authorization': `Token ${viduKey}`,
        'Content-Type': 'application/json'
      }
    });
    const { task_id } = data

    for (let i = 0; i < MAX_RETRIES; i++) {
      await sleep(RETRY_DELAY);
      console.log(`sleep終わった ${i + 1}回目`);

      const resVideo = await getVideo({ task_id });
      if (resVideo) {
        await saveFirestore({resVideo})
        return {
          videoUrl: resVideo,
          message: "動画は開いた後に長押しで保存できます",
        };
      }
    }

    return { videoUrl: null, message: errorMessage}
   } catch(e) {
    console.log('create video error', e)
    return { videoUrl: null, message: errorMessage}
   }
}

const createVideo_old = async({url}) => {
  try {
    const base64strings = await FileSystem.readAsStringAsync(url, {
      encoding: FileSystem.EncodingType.Base64
    })
    const base64Image = `data:image/jpeg;base64,${base64strings}`
    const { data } = await axios.post('https://api.novita.ai/v3/async/img2video', {
      model_name: 'SVD',
      image_file: base64Image,
      frames_num: 14,
      frames_per_second: 6,
      seed: moment().unix(),
      image_file_resize_mode: 'CROP_TO_ASPECT_RATIO',
      steps: 20,
      motion_bucket_id: null,
      cond_aug: null,
      enable_frame_interpolation: false,
      extra: {
        response_video_type: 'mp4'
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${novitaaiKey}`
      }
    });
    const { task_id } = data
    console.log('task_id', task_id)

    for (let i = 0; i < MAX_RETRIES; i++) {
      await sleep(RETRY_DELAY);
      console.log(`sleep終わった ${i + 1}回目`);

      const resVideo = await getVideo({ task_id });
      if (resVideo) {
        return {
          videoUrl: resVideo,
          message: "動画は開いた後に長押しで保存できます",
        };
      }
    }

    return { videoUrl: null, message: errorMessage}
  } catch(e) {
    console.log('create video error', e)
    return { videoUrl: null, message: errorMessage}
  }
}

const getVideo = async({task_id}) => {
  try {
    const API_URL = `https://api.vidu.com/ent/v2/tasks/${task_id}/creations`;
    const { data } = await axios.get(API_URL, {
      headers: {
        'Authorization': `Token ${viduKey}`
      }
    });
    if(data.state === 'failed') throw new Error('video generation failed');
    if(data.state === 'success' && data.creations[0] && data.creations[0].url) {
      const uri = await getLocalVideo(data.creations[0].url)
      return uri
    } else {
      return null
    }
  } catch(e) {
    console.log('get video error', e)
    return null
  }
}

const getVideo_old = async({task_id}) => {
  try {
    const { data } = await axios.get(`https://api.novita.ai/v3/async/task-result?task_id=${task_id}`, {
      headers: {
        'Authorization': `Bearer ${novitaaiKey}`
      }
    });
    if(data.videos[0] && data.videos[0].video_url) {
      const uri = await getLocalVideo(data.videos[0].video_url)
      return uri
    } else {
      return null
    }
  } catch(e) {
    console.log('get video error', e)
    return null
  }
}

const getLocalVideo = async(url) => {
  try {
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + moment().unix() + '.mp4'
    );
    const { uri } = await downloadResumable.downloadAsync();
    return uri
  } catch(e) {
    throw new Error('get local video error')
  }
}

const saveVideo = async({url}) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      await MediaLibrary.saveToLibraryAsync(url)
      return true
    } else {
      return false
    }
  } catch (e) {
    console.error('Error downloading video:', e);
    return false
  }
}

const convertBase64ToLocalUri = async({base64String}) => {
  try {
    const fileName = `${FileSystem.documentDirectory}temp_video_${moment().unix()}.mp4`;
    // Base64データをデコードしてファイルに書き込む
    await FileSystem.writeAsStringAsync(fileName, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // ファイルのURIを返す
    return fileName;
  } catch(e) {
    console.log('convert base64 to local uri error', e)
    throw new Error('convert base64 to local uri error')
  }
}

export { createVideo, saveVideo, getLocalVideo, convertBase64ToLocalUri }