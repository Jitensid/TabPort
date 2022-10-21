import { fireEvent, render, screen } from '@testing-library/react';
import UploadButton from '../../../components/UploadButton/UploadButton';
import chrome from '../../../chrome/chrome';
import { utils } from 'xlsx';

// mock the alert method for testing
window.alert = jest.fn();

// Test suite for Upload Button Component
describe('Upload Button Component showDownloadButton equal to true', () => {
	test('Check if Upload Button renders properly', () => {
		render(
			<UploadButton 
				showDownloadButton={true}
				setShowDownloadButton={() => {
					jest.fn();
				}}
			/>
		);

		// check if the upload button and file input reference are present in the document
		expect(screen.getByText('Upload Tabs')).toBeInTheDocument();
		expect(screen.getByTestId('fileInputRef')).toBeInTheDocument();
	});
});

describe('Upload Button Component functions working properly showDownloadButton equal to false', () => {
	beforeEach(() => {
		render(
			<UploadButton
				showDownloadButton={false}
				setShowDownloadButton={() => {
					jest.fn();
				}}
			/>
		);
		jest.restoreAllMocks();
	});

	test('Upload Button Click works properly with Json File', () => {
		// query the uploadButton from the DOM
		const uploadButtonElement = screen.getByText('Upload Tabs');

		// query the file input from the DOM
		const fileInputRefElement = screen.getByTestId('fileInputRef');

		// create a dummy object to be stored as JSON file
		const validJSONFile = [{ title: 'world', url: 'google.com' }];

		// create a test blob file in JSON Format
		const testJSONBlob = new Blob([JSON.stringify(validJSONFile, null, 2)], {
			type: 'application/json',
		});

		// create a test json file
		const testJSONFile = new File([testJSONBlob], "tabs.json", {
			type: "application/json"
		})

		// mock the fileReader's readAsText with jest.fn()
		const fileReader = {
			readAsText: jest.fn(),
		};

		let onloadRef, onerrorRef;

		// define the fileReader's onload property
		Object.defineProperty(fileReader, 'onload', {
			get() {
				return this._onload;
			},
			set(onload) {
				onloadRef = onload;
				this._onload = onload;
			},
		});

		// define the fileReader's onerror property
		Object.defineProperty(fileReader, 'onerror', {
			get() {
				return this._onerror;
			},
			set(onerror) {
				onerrorRef = onerror;
				this._onerror = onerror;
			},
		});

		// spy on the FileReader and provide mockImplementation with the one defined above
		jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

		// initiate a click event
		fireEvent.click(uploadButtonElement);

		// initiate a change event on the file input
		fireEvent.change(fileInputRefElement, {
			target: {
				files: [testJSONFile],
			},
		});

		// call the mocked onload of the FileReader
		fileReader.onload = function(event) {
			return {target: {result: 'a'}}
		};

		// call the mocked onerror of the FileReader
		fileReader.onerror = function(error) {
			return 's';
		};

		expect(fileReader.readAsText).toBeCalledWith(testJSONFile);
	});


	test('Upload Button Click works properly with Excel File', () => {
		// query the uploadButton from the DOM
		const uploadButtonElement = screen.getByText('Upload Tabs');

		// query the file input from the DOM
		const fileInputRefElement = screen.getByTestId('fileInputRef');

		// json data that will be used to craete an excel file
		const jsonData = [{ title: 'world', url: 'google.com' }];

		// create excel file blob
		const testExcelBlob = utils.json_to_sheet(jsonData);
		
		// create a test excel file
		const testExcelFile = new File([testExcelBlob], "tabs.xlsx", {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		})

		// mock the fileReader's readAsArrayBuffer with jest.fn()
		const fileReader = {
			readAsArrayBuffer: jest.fn()
		};

		let onloadRef, onerrorRef;

		// define the fileReader's onload property
		Object.defineProperty(fileReader, 'onload', {
			get() {
				return this._onload;
			},
			set(onload) {
				onloadRef = onload;
				this._onload = onload;
			},
		});

		// define the fileReader's onerror property
		Object.defineProperty(fileReader, 'onerror', {
			get() {
				return this._onerror;
			},
			set(onerror) {
				onerrorRef = onerror;
				this._onerror = onerror;
			},
		});

		// spy on the FileReader and provide mockImplementation with the one defined above
		jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

		// initiate a click event
		fireEvent.click(uploadButtonElement);

		// initiate a change event on the file input
		fireEvent.change(fileInputRefElement, {
			target: {
				files: [testExcelFile],
			},
		});

		// call the mocked onload of the FileReader
		fileReader.onload = function(event) {
			return {target: {result: 'a'}}
		};

		// call the mocked onerror of the FileReader
		fileReader.onerror = function(error) {
			return 's';
		};

		expect(fileReader.readAsArrayBuffer).toBeCalledWith(testExcelFile);
	});
});
