import { determinUrlType, fileFormats } from "../../utils/FileFormat";

describe("FileFormat Util", () => {
    test("determinUrlType returns correct type", () => {
        const x = determinUrlType(fileFormats.json);
        const y = determinUrlType(fileFormats.txt);
        expect(x).toBe("application/json");
        expect(y).toBe("text/plain");
    });
});