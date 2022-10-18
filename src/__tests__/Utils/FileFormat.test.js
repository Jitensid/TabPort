import { determinUrlType, fileFormats } from '../../utils/FileFormat';

describe('FileFormat Util', () => {
	test('determinUrlType returns correct type', () => {
		const json = determinUrlType(fileFormats.json);
		const txt = determinUrlType(fileFormats.txt);
		const other = determinUrlType('other');

		expect(json).toBe('application/json');
		expect(txt).toBe('text/plain');
		expect(other).toBe('application/json');
	});
});
