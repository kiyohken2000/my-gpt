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
      seed: 20231127,
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
    await sleep(120000)
    console.log('sleep終わった')
    const { data: videoData } = await axios.get(`https://api.novita.ai/v3/async/task-result?task_id=${task_id}`, {
      headers: {
        'Authorization': `Bearer ${novitaaiKey}`
      }
    });
    console.log('videoData', videoData)
    const videoUrl = videoData.videos[0].video_url
    if(videoUrl) {
      return { videoUrl: videoUrl, message: '動画は開いた後に長押しで保存できます'}
    } else {
      return { videoUrl: null, message: errorMessage}
    }
  } catch(error) {
    console.log('create video error', e)
    return { videoUrl: null, message: errorMessage}
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