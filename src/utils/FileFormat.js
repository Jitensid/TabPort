//availabe file formats to download
export const fileFormats = {
    json: 'json',
    txt: 'txt',
    excel: 'xlsx',
}

//determins the correct URL type needed for the file download
export function determinUrlType(fileFormat) {
    switch (fileFormat) {
        case fileFormats.json:
            return "application/json"
        case fileFormats.txt:
            return "text/plain"
        default:
            return "application/json"
    }
}
