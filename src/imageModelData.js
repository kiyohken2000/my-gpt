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
    label: 'Pony🐴',
    sequence: 3,
    negativePromptKey: 'negativePromptPony',
    url: 'https://api-inference.huggingface.co/models/votepurchase/ponyDiffusionV6XL',
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
    url: 'https://api-inference.huggingface.co/models/UnfilteredAI/NSFW-gen-v2.1',
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
    label: 'RealPony🐴',
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
  },
  EbaraPony: {
    label: 'EbaraPony🐴',
    sequence: 14,
    negativePromptKey: 'negativePromptEbaraPony',
    url: 'https://api-inference.huggingface.co/models/votepurchase/ebara-pony-v1-sdxl',
    recommendNegativePrompt: 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon',
  },
  waiANIMIXPONYXL: {
    label: 'waiANIMIXPONYXL🐴',
    sequence: 15,
    negativePromptKey: 'negativePromptWaiANIMIXPONYXL',
    url: 'https://api-inference.huggingface.co/models/votepurchase/waiANIMIXPONYXL_v10',
    recommendNegativePrompt: 'low quality, worst quality, 3d, monochrome, (censor), render, text, watermark,source_furry, source_pony, source_cartoon, monochrome,',
  },
  waiREALMIX: {
    label: 'waiREALMIX🐴',
    sequence: 16,
    negativePromptKey: 'negativePromptWaiREALMIX',
    url: 'https://api-inference.huggingface.co/models/votepurchase/waiREALMIX_v70',
    recommendNegativePrompt: 'score_6,score_5,score_4, worst quality, low quality, bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry,',
  },
  AnythingXL: {
    label: 'AnythingXL',
    sequence: 17,
    negativePromptKey: 'negativePromptAnythingXL',
    url: 'https://api-inference.huggingface.co/models/votepurchase/AnythingXL_xl',
    recommendNegativePrompt: 'nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name',
  },
  waiREALCN: {
    label: 'waiREALCN🐴',
    sequence: 18,
    negativePromptKey: 'negativePromptWaiREALCN',
    url: 'https://api-inference.huggingface.co/models/votepurchase/waiREALCN_v10',
    recommendNegativePrompt: 'score_6,score_5,score_4,bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry, ',
  },
  AnimeBulldozer: {
    label: 'AnimeBulldozer',
    sequence: 19,
    negativePromptKey: 'negativePromptAnimeBulldozer',
    url: 'https://api-inference.huggingface.co/models/John6666/anime-bulldozer-v2-sdxl',
    recommendNegativePrompt: 'unaestheticXLv13, negativeXL_D, bad anatomy, blurry, disembodied limb, Two navel eyes, worst quality, low quality, More than five fingers in one hand, More than 5 toes on one foot, hand with more than 5 fingers, hand with less than 4 fingers, ad anatomy, bad hands, mutated hands and fingers, extra legs, extra arms, interlocked fingers, duplicate, cropped, text, jpeg, artifacts, signature, watermark, username, blurry, artist name, trademark, title, muscular, sd character, multiple view, Reference sheet, long body, malformed limbs, multiple breasts, cloned face, malformed, mutated, bad anatomy, disfigured, bad proportions, duplicate, bad feet, artist name, extra limbs, ugly, fused anus, text font UI, missing limb',
  },
  MomoiroPony: {
    label: 'MomoiroPony🐴',
    sequence: 20,
    negativePromptKey: 'negativePromptMomoiroPony',
    url: 'https://api-inference.huggingface.co/models/John6666/momoiro-pony-v14-sdxl',
    recommendNegativePrompt: 'deformed anatomy, deformed fingers, realistic, source_furry, censored, @_@, heart-shaped pupils, abs',
  },
  HanamomoPony: {
    label: 'HanamomoPony🐴',
    sequence: 21,
    negativePromptKey: 'negativePromptHanamomoPony',
    url: 'https://api-inference.huggingface.co/models/John6666/hanamomo-pony-v14-sdxl',
    recommendNegativePrompt: 'deformed anatomy, deformed fingers, realistic, source_furry, censored, @_@, heart-shaped pupils, abs',
  },
  DeepDarkHentaiMix: {
    label: 'DeepDarkHentaiMix',
    sequence: 22,
    negativePromptKey: 'negativePromptDeepDarkHentaiMix',
    url: 'https://api-inference.huggingface.co/models/John6666/deep-dark-hentai-mix-v60-sdxl',
    recommendNegativePrompt: 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]',
  },
  SeventhAnimeXLPony: {
    label: '7thAnimeXLPony🐴',
    sequence: 23,
    negativePromptKey: 'negativePromptSeventhAnimeXLPony',
    url: 'https://api-inference.huggingface.co/models/votepurchase/7thAnimeXLPonyA_v10',
    recommendNegativePrompt: 'score_4,score_5,score_6,source_pony,source_furry,monochrome,3d,photo,hyperrealistic,realstic,rough sketch,fewer digits,extra digits,signature,artist name,',
  },
  RealPonyCuteJp: {
    label: 'RealPonyCuteJp🐴',
    sequence: 24,
    negativePromptKey: 'negativePromptRealPonyCuteJp',
    url: 'https://api-inference.huggingface.co/models/John6666/real-pony-cutejp-v3-sdxl',
    recommendNegativePrompt: 'score_6,score_5,score_4,bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry, ',
  },
  Rumblexl: {
    label: 'Rumblexl',
    sequence: 25,
    negativePromptKey: 'negativePromptRumblexl',
    url: 'https://api-inference.huggingface.co/models/John6666/rumblexl-v13-sdxl',
    recommendNegativePrompt: 'paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, (outdoor:1.6), manboobs, (backlight:1.2), double navel, mutad arms, hused arms, neck lace, analog, analog effects, (sunglass:1.4), nipples, nsfw, bad architecture',
  },
  Mix3x3x3xl: {
    label: '3x3x3mixxl🐴',
    sequence: 26,
    negativePromptKey: 'negativePromptMix3x3x3xl',
    url: 'https://api-inference.huggingface.co/models/John6666/3x3x3mixxl-v1-sdxl',
    recommendNegativePrompt: 'score_6 , score_5 , score_4 , source_furry, source_pony, source_cartoon,',
  },
  YamersAnime: {
    label: 'YamersAnime',
    sequence: 27,
    negativePromptKey: 'negativePromptYamersAnime',
    url: 'https://api-inference.huggingface.co/models/John6666/yamers-anime-sa-sdxl',
    recommendNegativePrompt: 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]',
  },
  Baxl: {
    label: 'Baxl',
    sequence: 28,
    negativePromptKey: 'negativePromptBaxl',
    url: 'https://api-inference.huggingface.co/models/John6666/baxl-v3-sdxl',
    recommendNegativePrompt: 'lowres, error, worst quality, low quality, jpeg artifacts, watermark, signature, username',
  },
  CuteCore: {
    label: 'CuteCore',
    sequence: 29,
    negativePromptKey: 'negativePromptCuteCore',
    url: 'https://api-inference.huggingface.co/models/John6666/cute-core-v3-sdxl',
    recommendNegativePrompt: 'nsfw, simple background, censored, blurry',
  },
  FeaturelessMix: {
    label: 'FeaturelessMix🐴',
    sequence: 30,
    negativePromptKey: 'negativePromptFeaturelessMix',
    url: 'https://api-inference.huggingface.co/models/John6666/featureless-mix-pony-v1-sdxl',
    recommendNegativePrompt: 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon',
  },
  ManmaruMix: {
    label: 'ManmaruMix🐴',
    sequence: 31,
    negativePromptKey: 'negativePromptManmaruMix',
    url: 'https://api-inference.huggingface.co/models/John6666/manmaru_mix_pony-v1-sdxl',
    recommendNegativePrompt: 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon',
  },
  ChacolOmegaMix: {
    label: 'ChacolOmegaMix🐴',
    sequence: 32,
    negativePromptKey: 'negativePromptChacolOmegaMix',
    url: 'https://api-inference.huggingface.co/models/John6666/chacol-omega-mix-v11a-sdxl',
    recommendNegativePrompt: 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon',
  },
  EponaMix: {
    label: 'EponaMix🐴',
    sequence: 33,
    negativePromptKey: 'negativePromptEponaMix',
    url: 'https://api-inference.huggingface.co/models/John6666/epona-mix-v3-sdxl',
    recommendNegativePrompt: 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon',
  },
  PVCMovable: {
    label: 'PVCMovable🐴',
    sequence: 34,
    negativePromptKey: 'negativePromptPVCMovable',
    url: 'https://api-inference.huggingface.co/models/votepurchase/PVCStyleModelMovable_pony151',
    recommendNegativePrompt: 'engrish text,low quality,worstquality,shiny_skin,score_4,score_3,score_2,score_1,ugly,bad feet,bad hands,',
  },
  PVCRealistic: {
    label: 'PVCRealistic',
    sequence: 35,
    negativePromptKey: 'negativePromptPVCRealistic',
    url: 'https://api-inference.huggingface.co/models/votepurchase/PVCStyleModelMovable_beta27Realistic',
    recommendNegativePrompt: 'lowres,(bad),text,error,fewer,extra,missing,worst quality,jpeg artifacts,low quality,watermark,unfinished,displeasing,oldest,early,chromatic aberration,artistic error,username,english text,scan,[abstract],',
  },
  PVCFantasy: {
    label: 'PVCFantasy',
    sequence: 36,
    negativePromptKey: 'negativePromptPVCFantasy',
    url: 'https://api-inference.huggingface.co/models/votepurchase/PVCStyleModelFantasy_beta12',
    recommendNegativePrompt: 'blurry,lowres,bad anatomy,(text:1.2),error,missing fingers,(watermark:1.3),extra digit,fewer digits,cropped,worst quality,low quality,(artist name:1.1),normal quality,bad hands,signature,(username:1.2),',
  },
}

export { imageModelData }