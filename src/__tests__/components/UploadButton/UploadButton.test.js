/*global chrome*/

import { fireEvent, render, screen } from '@testing-library/react';
import UploadButton from '../../../components/UploadButton/UploadButton';

// mock the chrome api's query and create methods for testing
global.chrome = {
	tabs: {
		query: jest.fn(),
		create: jest.fn(),
	},
};

// mock the alert method for testing
window.alert = jest.fn();

// Test suite for Upload Button Component
describe('Upload Button Component renders properly', () => {
	test('Check if Upload Button is working properly', () => {
		render(<UploadButton />);

		// check if the upload button and file input reference are present in the document
		expect(screen.getByText('Upload Tabs')).toBeInTheDocument();
		expect(screen.getByTestId('fileInputRef')).toBeInTheDocument();
	});
});

describe('Upload Button Component functions work properly', () => {
	beforeEach(() => {
		render(<UploadButton />);
		jest.restoreAllMocks();
	});

	test('Upload Button Click works properly with Correct File', () => {
		// query the uploadButton from the DOM
		const uploadButtonElement = screen.getByText('Upload Tabs');

		// query the file input from the DOM
		const fileInputRefElement = screen.getByTestId('fileInputRef');

		// create a dummy object to be stored as JSON file
		const validJSONFile = [{ title: 'world', url: 'google.com' }];

		// create a dummy file in JSON Format
		const dummyFile = new Blob([JSON.stringify(validJSONFile, null, 2)], {
			type: 'application/json',
		});

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
				files: [dummyFile],
			},
		});

		// call the mocked onload of the FileReader
		fileReader.onload({ target: { result: 'a' } });

		// call the mocked onerror of the FileReader
		fileReader.onerror('s');

		expect(fileReader.readAsText).toBeCalledWith(dummyFile);
	});
});
