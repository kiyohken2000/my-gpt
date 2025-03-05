import { googleSheetKey } from "./openaiKeys"

const versionName = '1.0.65.3'
const iosBuildNumber = '74'
const androidVersionCode = '83'
const isDevMode = false

const sheetId = '15OtDRuaSXWhZ8odAHi0E7Pn93hzvO3gvDIYSpopNngY'
const sheetName = 'sheet2'
const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE&key=${googleSheetKey}`

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

const convertHiraganaAPI = 'https://labs.goo.ne.jp/api/hiragana'

const zeroGPUUrl = 'https://mygpt-image-api-omc3n2et7a-an.a.run.app'
const zeroGPUUrls = [
  'https://mygpt-image-api-omc3n2et7a-an.a.run.app',
  'https://mygpt-image-api-2-omc3n2et7a-uc.a.run.app',
  'https://mygpt-image-api-3-omc3n2et7a-uc.a.run.app',
  'https://mygpt-image-api-4-omc3n2et7a-uc.a.run.app',
  'https://mygpt-image-api-5-omc3n2et7a-uc.a.run.app',
  'https://mygpt-image-api-6-omc3n2et7a-uc.a.run.app',
]

const chupaVoiceBaseUrl = 'https://chupa-api-omc3n2et7a-an.a.run.app'
const chupaVoiceEndpoints = {
  getRandom: `${chupaVoiceBaseUrl}/generate_random`,
  generateVoice: `${chupaVoiceBaseUrl}/generate_sound`,
}

export {
  versionName,
  googleSheetUrl,
  myEndpoints,
  headers,
  imgurKey,
  isDevMode,
  iosBuildNumber,
  androidVersionCode,
  zeroGPUUrl,
  zeroGPUUrls,
  convertHiraganaAPI,
  chupaVoiceEndpoints,
}