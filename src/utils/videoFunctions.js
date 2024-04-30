import { novitaaiKey } from "../openaiKeys";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { sleep } from "./utilFunctions";
import { errorMessage } from "./textGenerate";
import * as MediaLibrary from 'expo-media-library';
import moment from "moment";

const createVideo = async({url}) => {
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
    await sleep(60000)
    console.log('sleep終わった 1回目')
    const resVideo1 = await getVideo({task_id})
    if(resVideo1) return { videoUrl: resVideo1, message: '動画は開いた後に長押しで保存できます'}
    await sleep(60000)
    console.log('sleep終わった 2回目')
    const resVideo2 = await getVideo({task_id})
    if(resVideo2) return { videoUrl: resVideo2, message: '動画は開いた後に長押しで保存できます'}
    await sleep(60000)
    console.log('sleep終わった 3回目')
    const resVideo3 = await getVideo({task_id})
    if(resVideo3) return { videoUrl: resVideo3, message: '動画は開いた後に長押しで保存できます'}
    await sleep(60000)
    console.log('sleep終わった 4回目')
    const resVideo4 = await getVideo({task_id})
    if(resVideo4) return { videoUrl: resVideo4, message: '動画は開いた後に長押しで保存できます'}
    await sleep(60000)
    console.log('sleep終わった 5回目')
    const resVideo5 = await getVideo({task_id})
    if(resVideo5) return { videoUrl: resVideo5, message: '動画は開いた後に長押しで保存できます'}
    await sleep(60000)
    console.log('sleep終わった 5回目')
    const resVideo6 = await getVideo({task_id})
    if(resVideo6) return { videoUrl: resVideo6, message: '動画は開いた後に長押しで保存できます'}

    return { videoUrl: null, message: errorMessage}
  } catch(error) {
    console.log('create video error', e)
    return { videoUrl: null, message: errorMessage}
  }
}

const getVideo = async({task_id}) => {
  try {
    const { data } = await axios.get(`https://api.novita.ai/v3/async/task-result?task_id=${task_id}`, {
      headers: {
        'Authorization': `Bearer ${novitaaiKey}`
      }
    });
    if(data.videos[0] && data.videos[0].video_url) {
      return data.videos[0].video_url
    } else {
      return null
    }
  } catch(e) {
    console.log('get video error', e)
    return null
  }
}

const saveVideo = async({url}) => {
  try {
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + moment().unix() + '.mp4'
    );
    const { uri } = await downloadResumable.downloadAsync();
    console.log('Video downloaded to:', uri);
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      console.log('Video saved to media library');
      return true
    } else {
      return false
    }
  } catch (e) {
    console.error('Error downloading video:', e);
    return false
  }
}

export { createVideo, saveVideo }