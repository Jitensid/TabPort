/*global chrome*/

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

global.chrome = {
	tabs: {
		query: jest.fn(),
	},
};

// stores the titles and urls of tabs used for unit tests
const mockedTabsList = [
	{ url: 'url1', title: 'title1' },
	{ url: 'url2', title: 'title2' },
];

describe('App Component Unit Tests', () => {
	let downloadTabsButtonElement, uploadTabsButtonElement;

	let mockedTabsQuery;
	beforeEach(() => {
		mockedTabsQuery = jest.spyOn(chrome.tabs, 'query').mockImplementation(
			(
				query,
				cb = (tabs) => {
					return tabs;
				}
			) => {
				return cb(mockedTabsList);
			}
		);
		render(<App />);
		downloadTabsButtonElement = screen
			.getByText('Download Tabs')
			.closest('button');
		uploadTabsButtonElement = screen
			.getByText('Upload Tabs')
			.closest('button');
	});

	test('App Component renders properly', () => {
		// test if download and upload button render properly in the document
		expect(downloadTabsButtonElement).toBeInTheDocument();
		expect(uploadTabsButtonElement).toBeInTheDocument();
	});

	test('Download Tabs Button Click hides upload Tabs Button', async () => {
		fireEvent.click(downloadTabsButtonElement);

		await waitFor(() => {
			expect(screen.queryByText('Upload Tabs')).not.toBeInTheDocument();
		});
	});
});
