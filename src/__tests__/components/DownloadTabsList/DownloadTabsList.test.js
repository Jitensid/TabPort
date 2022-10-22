import { fireEvent, render, screen } from '@testing-library/react';
import DownloadTabsList from '../../../components/DownloadTabsList/DownloadTabsList';
import chrome from '../../../chrome/chrome';

// stores the titles and urls of tabs used for unit testss
const mockedTabsList = [
	{ url: 'url1', title: 'title1' },
	{ url: 'url2', title: 'title2' },
];

global.URL = {
	createObjectURL: jest.fn(),
};

describe('DownloadTabsList Component with setShowUploadButton hidden', () => {
	let backButtonElement;
	let downloadTabsButtonElement;
	let downloadAllTabsCheckBoxElement;
	let mockedTabsQuery, mockedCreateObjectURL, mockedDownloadTabs;

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

		mockedCreateObjectURL = jest
			.spyOn(global.URL, 'createObjectURL')
			.mockImplementation(() => {});

		mockedDownloadTabs = jest
			.spyOn(chrome.downloads, 'download')
			.mockImplementation((options) => {});

		render(<DownloadTabsList setShowUploadButton={false} />);
		backButtonElement = screen.getByRole('button', { name: 'Back' });
		downloadTabsButtonElement = screen.getByRole('button', {
			name: 'Download Tabs',
		});
		downloadAllTabsCheckBoxElement = document.querySelector("#checkboxTabs");
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const testsValidateTabs = () => {
		// assume opened tabs more than one
		if(mockedTabsList.length > 1){
			test("Show Download All Tabs checkbox", () => {
				expect(downloadAllTabsCheckBoxElement).toBeVisible();
			});
		} else {
			test("Hide Download All Tabs checkbox", () => {
				expect(downloadAllTabsCheckBoxElement).not.toBeVisible();
			});
		}
	}

	testsValidateTabs();

	test('Back, Download Tabs Button and Download All Tabs checkbox is rendered properly', () => {
		// test that back, downloadTabs and downloadAllTabs Checkbox are rendered properly
		expect(backButtonElement).toBeInTheDocument();
		expect(downloadTabsButtonElement).toBeInTheDocument();
		expect(downloadAllTabsCheckBoxElement).toBeInTheDocument();
		expect(mockedTabsQuery).toBeCalledTimes(1);
	});

	test('DownloadAllTabsCheckbox is already checked by default', () => {
		// test if the downloadAllTabsCheckBox is by default checked
		expect(downloadAllTabsCheckBoxElement).toHaveProperty('checked', true);
	});

	test('DownloadTabs Button Click', () => {
		// click the download tabs button
		fireEvent.click(downloadTabsButtonElement);

		// test that createObjectURL mock function is called
		expect(mockedCreateObjectURL).toBeCalledTimes(1);

		// test that chrome's download api mock function is called
		expect(mockedDownloadTabs).toBeCalledTimes(1);
	});

	// uncheck the downloadAllTabsCheckbox for this test suite
	describe('downloadAllTabsCheckbox is unchecked', () => {
		beforeEach(() => {
			// uncheck the downloadAllTabsCheckbox
			fireEvent.click(downloadAllTabsCheckBoxElement);
		});

		afterEach(() => {
			jest.restoreAllMocks();
		});

		test('List of tabs is displayed properly', () => {
			expect(downloadAllTabsCheckBoxElement).toHaveProperty(
				'checked',
				false
			);
			expect(
				screen.getByText(mockedTabsList[0]['title'])
			).toBeInTheDocument();
		});

		test('uncheck single tab from the tabs list', () => {
			// query the single tab checkbox from the rendered tabs list
			const firstTabCheckboxElement = screen.getByTestId('single_tab_0');

			// test if present in the DOM
			expect(firstTabCheckboxElement).toBeInTheDocument();

			// test that by default the single tab checkbox is checked
			expect(firstTabCheckboxElement).toHaveProperty('checked', true);

			// click the single tab checkbox to uncheck it
			fireEvent.click(firstTabCheckboxElement);

			// test that the single tab checkbox is unchecked
			expect(firstTabCheckboxElement).toHaveProperty('checked', false);

			// click the single tab checkbox to check it
			fireEvent.click(firstTabCheckboxElement);

			// test that the single tab checkbox is checked
			expect(firstTabCheckboxElement).toHaveProperty('checked', true);
		});
	});

	test('Check if Upload Button is absent when the prop for it is set to false', () => {
		expect(screen.queryByText('Upload Tabs')).not.toBeInTheDocument();
	});
});
