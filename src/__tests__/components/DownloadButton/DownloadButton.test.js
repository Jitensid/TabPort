/*global chrome*/

import { fireEvent, render, screen } from '@testing-library/react';
import DownloadButton from '../../../components/DownloadButton/DownloadButton';

global.chrome = {
	tabs: {
		create: jest.fn(),
		query: jest.fn(),
	},
	downloads: {
		download: jest.fn(),
	},
};

global.URL = {
	createObjectURL: jest.fn(),
};

// stores the titles and urls of tabs used for unit tests
const mockedTabsList = [
	{ url: 'url1', title: 'title1' },
	{ url: 'url2', title: 'title2' },
];

describe('DownloadButtons Component showUploadButton equal to false', () => {
	let downloadTabsButtonElement;
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

		render(
			<DownloadButton
				showUploadButton={false}
				setShowUploadButton={() => {
					jest.fn();
				}}
			/>
		);

		downloadTabsButtonElement = screen.getByRole('button', {
			name: 'Download Tabs',
		});
	});

	test('Download Button Component renders properly', () => {
		expect(downloadTabsButtonElement).toBeInTheDocument();
		expect(mockedTabsQuery).toBeCalled();
	});

	test('DownloadButton Click works properly', () => {
		fireEvent.click(downloadTabsButtonElement);

		const backButtonElement = screen.getByRole('button', { name: 'Back' });

		const downloadTabsButtonElementOfDownloadTabsListComponent =
			screen.getByRole('button', {
				name: 'Download Tabs',
			});

		const downloadAllTabsCheckBoxElement = screen.getByRole('checkbox');

		expect(backButtonElement).toBeInTheDocument();
		expect(downloadAllTabsCheckBoxElement).toBeInTheDocument();
		expect(
			downloadTabsButtonElementOfDownloadTabsListComponent
		).toBeInTheDocument();
	});
});

describe('DownloadButtons Component showUploadButton equal to true', () => {
	let mockedTabsQuery;
	let downloadTabsButtonElement;

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

		render(
			<DownloadButton
				showUploadButton={true}
				setShowUploadButton={() => {
					jest.fn();
				}}
			/>
		);

		downloadTabsButtonElement = screen.getByRole('button', {
			name: 'Download Tabs',
		});
	});

	test('DownloadButton Click Test', () => {
		fireEvent.click(downloadTabsButtonElement);
	});
});

describe('DownloadButtons Component showUploadButton equal to true and no tabs', () => {
	let mockedTabsQuery;
	let downloadTabsButtonElement;

	beforeEach(() => {
		mockedTabsQuery = jest.spyOn(chrome.tabs, 'query').mockImplementation(
			(
				query,
				cb = (tabs) => {
					return tabs;
				}
			) => {
				return cb([]);
			}
		);

		render(
			<DownloadButton
				showUploadButton={true}
				setShowUploadButton={() => {
					jest.fn();
				}}
			/>
		);

		downloadTabsButtonElement = screen.getByRole('button', {
			name: 'Download Tabs',
		});
	});

	test('DownloadButton Click Test', () => {
		fireEvent.click(downloadTabsButtonElement);
	});
});
