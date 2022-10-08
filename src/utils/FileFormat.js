export const FileFormats = {
    json: 'json',
    txt: 'txt'
}

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
