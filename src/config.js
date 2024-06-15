import { googleSheetKey } from "./openaiKeys"

const versionName = '1.0.52'
const iosBuildNumber = '59'

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

export { versionName, googleSheetUrl, myEndpoints, headers, imgurKey, iosBuildNumber, }