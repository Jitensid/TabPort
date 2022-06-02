import { fireEvent, render, screen } from '@testing-library/react';
import DownloadButton from '../../../components/DownloadButton/DownloadButton';
import chrome from '../../../chrome/chrome';

global.URL = {
	createObjectURL: jest.fn(),
};

// stores the titles and urls of tabs used for unit tests
const mockedTabsList = [
	{ url: 'url1', title: 'title1' },
	{ url: 'url2', title: 'title2' },
];

let mockedTabsQuery;

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

describe('DownloadButtons Component showUploadButton equal to false', () => {
	let downloadTabsButtonElement;

	beforeEach(() => {
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

	afterEach(() => {
		jest.restoreAllMocks();
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
	let downloadTabsButtonElement;

	beforeEach(() => {
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

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('DownloadButton Click Test', () => {
		fireEvent.click(downloadTabsButtonElement);
	});
});

describe('DownloadButtons Component showUploadButton equal to true and no tabs', () => {
	let downloadTabsButtonElement;

	beforeEach(() => {
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
