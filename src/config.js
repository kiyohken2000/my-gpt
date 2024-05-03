import { googleSheetKey } from "./openaiKeys"

const versionName = '1.0.23'

const sheetId = '15OtDRuaSXWhZ8odAHi0E7Pn93hzvO3gvDIYSpopNngY'
const sheetName = 'sheet2'
const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE&key=${googleSheetKey}`

export { versionName, googleSheetUrl }