const imageModelData = {
  RealisticVision: {
    label: 'RealisticVision',
    sequence: 1,
    negativePromptKey: 'negativePromptRealisticVision',
    url: 'https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4',
    recommendNegativePrompt: '(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck',
  },
  Animagine: {
    label: 'ANIMAGINE',
    sequence: 2,
    negativePromptKey: 'negativePromptAnimagine',
    url: 'https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.1',
    recommendNegativePrompt: 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]',
  },
  Pony: {
    label: 'Pony',
    sequence: 3,
    negativePromptKey: 'negativePromptPony',
    url: 'https://api-inference.huggingface.co/models/stablediffusionapi/pony',
    recommendNegativePrompt: 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon',
  },
  PVC: {
    label: 'PVC',
    sequence: 4,
    negativePromptKey: 'negativePromptPvc',
    url: 'https://api-inference.huggingface.co/models/p1atdev/pvcxl-v1-lora',
    recommendNegativePrompt: 'nsfw, worst quality, low quality, medium quality, deleted, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digits, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry',
  },
  ChilloutMix: {
    label: 'ChilloutMix',
    sequence: 5,
    negativePromptKey: 'negativePromptChillOut',
    url: 'https://api-inference.huggingface.co/models/Yntec/ChilloutMix',
    recommendNegativePrompt: 'paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, (outdoor:1.6), manboobs, (backlight:1.2), double navel, mutad arms, hused arms, neck lace, analog, analog effects, (sunglass:1.4), nipples, nsfw, bad architecture',
  },
  NsfwGenAnime: {
    label: 'NsfwGenAnime',
    sequence: 6,
    negativePromptKey: 'negativePromptNsfwGenAnime',
    url: 'https://api-inference.huggingface.co/models/UnfilteredAI/NSFW-GEN-ANIME-v2',
    recommendNegativePrompt: 'bad anatomy,long_neck,long_body,longbody,deformed mutated disfigured,missing arms,extra_arms,mutated hands,extra_legs,bad hands,poorly_drawn_hands,malformed_hands,missing_limb,floating_limbs,disconnected_limbs,extra_fingers,bad fingers,liquid fingers,poorly drawn fingers,missing fingers,extra digit,fewer digits,ugly face,deformed eyes,partial face,partial head,bad face,inaccurate limb,cropped',
  },
  NovelAIRemix: {
    label: 'NovelAIRemix',
    sequence: 7,
    negativePromptKey: 'negativePromptNovelAIRemix',
    url: 'https://api-inference.huggingface.co/models/Yntec/NovelAIRemix',
    recommendNegativePrompt: 'bad anatomy,long_neck,long_body,longbody,deformed mutated disfigured,missing arms,extra_arms,mutated hands,extra_legs,bad hands,poorly_drawn_hands,malformed_hands,missing_limb,floating_limbs,disconnected_limbs,extra_fingers,bad fingers,liquid fingers,poorly drawn fingers,missing fingers,extra digit,fewer digits,ugly face,deformed eyes,partial face,partial head,bad face,inaccurate limb,cropped',
  },
  NsfwGen: {
    label: 'NsfwGen',
    sequence: 8,
    negativePromptKey: 'negativePromptNsfwGen',
    url: 'https://api-inference.huggingface.co/models/UnfilteredAI/NSFW-gen-v2',
    recommendNegativePrompt: 'bad anatomy,long_neck,long_body,longbody,deformed mutated disfigured,missing arms,extra_arms,mutated hands,extra_legs,bad hands,poorly_drawn_hands,malformed_hands,missing_limb,floating_limbs,disconnected_limbs,extra_fingers,bad fingers,liquid fingers,poorly drawn fingers,missing fingers,extra digit,fewer digits,ugly face,deformed eyes,partial face,partial head,bad face,inaccurate limb,cropped',
  },
  Deliberate: {
    label: 'Deliberate',
    sequence: 9,
    negativePromptKey: 'negativePromptDeliberate',
    url: 'https://api-inference.huggingface.co/models/digiplay/PerfectDeliberate-Anime_v2',
    recommendNegativePrompt: 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]',
  },
  RealPony: {
    label: 'RealPony',
    sequence: 10,
    negativePromptKey: 'negativePromptRealPony',
    url: 'https://api-inference.huggingface.co/models/GraydientPlatformAPI/realpony-xl',
    recommendNegativePrompt: 'bad anatomy,long_neck,long_body,longbody,deformed mutated disfigured,missing arms,extra_arms,mutated hands,extra_legs,bad hands,poorly_drawn_hands,malformed_hands,missing_limb,floating_limbs,disconnected_limbs,extra_fingers,bad fingers,liquid fingers,poorly drawn fingers,missing fingers,extra digit,fewer digits,ugly face,deformed eyes,partial face,partial head,bad face,inaccurate limb,cropped',
  },
  ArtiWaifu: {
    label: 'ArtiWaifu',
    sequence: 11,
    negativePromptKey: 'negativePromptArtiWaifu',
    url: 'https://api-inference.huggingface.co/models/Eugeoter/artiwaifu-diffusion-1.0',
    recommendNegativePrompt: 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]',
  },
  StarryXL: {
    label: 'StarryXL',
    sequence: 12,
    negativePromptKey: 'negativePromptStarryXL',
    url: 'https://api-inference.huggingface.co/models/eienmojiki/Starry-XL-v5.2',
    recommendNegativePrompt: 'nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name,',
  },
  YakiDofuMix: {
    label: 'YakiDofuMix',
    sequence: 13,
    negativePromptKey: 'negativePromptYakiDofuMix',
    url: 'https://api-inference.huggingface.co/models/Vsukiyaki/Yaki-Dofu-Mix',
    recommendNegativePrompt: '(easynegative:1.0),(worst quality,low quality:1.2),(bad anatomy:1.4),(realistic:1.1),nose,lips,adult,fat,sad, (inaccurate limb:1.2),extra digit,fewer digits,six fingers,(monochrome:0.95),verybadimagenegative_v1.3,'
  }
}

export { imageModelData }