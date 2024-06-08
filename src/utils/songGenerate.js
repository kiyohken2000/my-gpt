import axios from "axios";
import { songBaseUrl } from "../openaiKeys";
import { errorMessage } from "./textGenerate";
import { getLocalVideo } from "./videoFunctions";
import { sleep } from "./utilFunctions";

const baseUrl = "http://localhost:3000";

async function generateAudioByPrompt(payload) {
  try {
    const url = `${songBaseUrl}/api/generate`;
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch(e) {
    throw new Error('generate audio by prompt error')
  }
}

async function getAudioInformation(audioIds) {
  try {
    const url = `${songBaseUrl}/api/get?ids=${audioIds}`;
    const response = await axios.get(url);
    return response.data;
  } catch(e) {
    throw new Error('get audio information error')
  }
}

async function getClipInformation(clipId) {
  try {
    const url = `${songBaseUrl}/api/clip?id=${clipId}`;
    const response = await axios.get(url);
    return response.data;
  } catch(e) {
    throw new Error('get clip information error')
  }
}

const generateSong = async({text}) => {
  try {
    const data = await generateAudioByPrompt({
      prompt: text,
      make_instrumental: false,
      wait_audio: false,
    });
  
    const ids = `${data[0].id},${data[1].id}`;
    console.log(`ids: ${ids}`);
  
    for (let i = 0; i < 60; i++) {
      const data = await getAudioInformation(ids);
      if (data[0].status === "complete" && data[1].status === "complete") {
        console.log(`${data[0].id} ==> ${data[0].audio_url}`);
        console.log(`${data[1].id} ==> ${data[1].audio_url}`);
        const audio_url1 = await getClipInformation(data[0].id)
        const audio_url2 = await getClipInformation(data[1].id)
        const videoUrl1 = await getLocalVideo(audio_url1.video_url)
        await sleep(10000)
        const videoUrl2 = await getLocalVideo(audio_url2.video_url)
        return [
          {
            message: audio_url1.title,
            videoUrl: videoUrl1,
            remoteUrl: audio_url1.video_url
          },
          {
            message: audio_url2.title,
            videoUrl: videoUrl2,
            remoteUrl: audio_url2.video_url
          },
       ]
      }
      // sleep 5s
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } catch(e) {
    console.log('generate song error', e)
    return [
      {
        message: errorMessage,
        videoUrl: null
      },
    ]
  }
}

export { generateSong }