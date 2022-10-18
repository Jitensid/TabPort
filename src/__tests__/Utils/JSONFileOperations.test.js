import chrome from '../../chrome/chrome';
import {
	copyFile,
	downloadFile,
} from '../../utils/JSONFileOperations/JSONFileOperations';

global.URL = {
	createObjectURL: jest.fn(),
};

global.document.execCommand = jest.fn();

// stores the titles and urls of tabs used for unit tests
const tabsList = [
	{ url: 'url1', title: 'title1' },
	{ url: 'url2', title: 'title2' },
];

describe('JSONFileOperations Util', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('downloadFile function should download the file using chrome api', () => {
		const mockedCreateObjectURL = jest
			.spyOn(global.URL, 'createObjectURL')
			.mockImplementation(() => {});

		const mockedDownloadTabs = jest
			.spyOn(chrome.downloads, 'download')
			.mockImplementation((options) => {});

		downloadFile(tabsList);

		// test that createObjectURL mock function is called
		expect(mockedCreateObjectURL).toBeCalledTimes(1);

		// test that chrome's download api mock function is called
		expect(mockedDownloadTabs).toBeCalledTimes(1);
	});

	test('copyFile function should copy a file using execCommand', () => {
		const mockedExecCommand = jest.spyOn(document, 'execCommand');

		copyFile(tabsList);

		// test that execCommand mock function is called
		expect(mockedExecCommand).toBeCalledTimes(1);
	});

	test('copyFile function should throw an error message when copy fails', () => {
		const mockedExecCommand = jest
			.spyOn(document, 'execCommand')
			.mockImplementation(() => {
				throw Error('');
			});

		const mockedConsole = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		copyFile(tabsList);

		// test that execCommand mock function is called
		expect(mockedExecCommand).toBeCalledTimes(1);

		// test that console.error mock function is called
		expect(mockedConsole).toBeCalledTimes(1);
	});
});
