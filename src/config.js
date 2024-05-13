import { googleSheetKey } from "./openaiKeys"

const versionName = '1.0.32'

const sheetId = '15OtDRuaSXWhZ8odAHi0E7Pn93hzvO3gvDIYSpopNngY'
const sheetName = 'sheet2'
const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE&key=${googleSheetKey}`

const recommendNegativePrompt = {
  realisticVision: '(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck',
  animagine: 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]',
  pony: 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon',
  pvc: 'nsfw, worst quality, low quality, medium quality, deleted, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digits, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry',
  chilloutMix: 'paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, (outdoor:1.6), manboobs, (backlight:1.2), double navel, mutad arms, hused arms, neck lace, analog, analog effects, (sunglass:1.4), nipples, nsfw, bad architecture',
  nsfwGenAnime: 'bad anatomy,long_neck,long_body,longbody,deformed mutated disfigured,missing arms,extra_arms,mutated hands,extra_legs,bad hands,poorly_drawn_hands,malformed_hands,missing_limb,floating_limbs,disconnected_limbs,extra_fingers,bad fingers,liquid fingers,poorly drawn fingers,missing fingers,extra digit,fewer digits,ugly face,deformed eyes,partial face,partial head,bad face,inaccurate limb,cropped',
  novelAIRemix: 'bad anatomy,long_neck,long_body,longbody,deformed mutated disfigured,missing arms,extra_arms,mutated hands,extra_legs,bad hands,poorly_drawn_hands,malformed_hands,missing_limb,floating_limbs,disconnected_limbs,extra_fingers,bad fingers,liquid fingers,poorly drawn fingers,missing fingers,extra digit,fewer digits,ugly face,deformed eyes,partial face,partial head,bad face,inaccurate limb,cropped',
  nsfwGen: 'bad anatomy,long_neck,long_body,longbody,deformed mutated disfigured,missing arms,extra_arms,mutated hands,extra_legs,bad hands,poorly_drawn_hands,malformed_hands,missing_limb,floating_limbs,disconnected_limbs,extra_fingers,bad fingers,liquid fingers,poorly drawn fingers,missing fingers,extra digit,fewer digits,ugly face,deformed eyes,partial face,partial head,bad face,inaccurate limb,cropped',
  deliberate: 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]',
}

const myEndpoints = {
  generateTags: 'https://mygpt-api-omc3n2et7a-uc.a.run.app',
  imgur: 'https://api.imgur.com/3/image',
}

const imgurKey = {
  client_id: '7c34970b70aef09',
  client_secret: 'b8d5bee0d6e73c7b7a5145c8fd98342a378bffb2'
}

const headers = {
  "Content-Type": "application/json",
}

export { versionName, googleSheetUrl, recommendNegativePrompt, myEndpoints, headers, imgurKey }