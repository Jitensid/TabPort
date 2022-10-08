//availabe file formats to download
export const FileFormats = {
    json: 'json',
    txt: 'txt'
}

//determins the correct URL type needed for the file download
export function DeterminUrlType(fileFormat) {
    switch (fileFormat) {
        case FileFormats.json:
            return "application/json"
        case FileFormats.txt:
            return "text/plain"
        default:
            return "application/json"
            break;
    }
}
