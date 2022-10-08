import { DeterminUrlType, FileFormats } from "../../utils/FileFormat";

describe("FileFormat Util", () => {
    test("DeterminUrlType returns correct type", () => {
        const x = DeterminUrlType(FileFormats.json);
        const y = DeterminUrlType(FileFormats.txt);
        expect(x).toBe("application/json");
        expect(y).toBe("text/plain");
    });
});