import { fireEvent, render, screen } from '@testing-library/react';
import UploadTabsList from '../../../components/UploadTabsList/UploadTabsList';

const uploadedTabsToOpen = [
	{ url: 'url1', title: 'title1' },
	{ url: 'url2', title: 'title2' },
]

describe('UploadTabsList component working properly', () => {
    let openAllTabsCheckBoxElement;
    let openTabsButtonElement;

    beforeEach(() => {
        render(
			<UploadTabsList
                uploadedTabsToOpen={uploadedTabsToOpen}				
			/>
		);
        
        // Open All Tabs Checkbox
        openAllTabsCheckBoxElement = screen.getByRole('checkbox');
        
        // Open Tabs Button
        openTabsButtonElement =
            screen.getByRole('button', {
                name: 'Open Tabs',
            });
    });
    
	afterEach(() => {
		jest.restoreAllMocks();
	});

    test('Open Tabs Button and Open All Tabs is rendered properly', () => {
		// Checking if the checkbox and open tabs button is present or not
		expect(openAllTabsCheckBoxElement).toBeInTheDocument();
		expect(
			openTabsButtonElement
		).toBeInTheDocument();
    })

	test('OpenAllTabsCheckbox is already checked by default', () => {
		// test if the downloadAllTabsCheckBox is by default checked
		expect(openAllTabsCheckBoxElement).toHaveProperty('checked', true);
	});


	// uncheck the downloadAllTabsCheckbox for this test suite
	describe('downloadAllTabsCheckbox is unchecked', () => {
		beforeEach(() => {
			// uncheck the downloadAllTabsCheckbox
			fireEvent.click(openAllTabsCheckBoxElement);
		});

		afterEach(() => {
			jest.restoreAllMocks();
		});

		test('List of tabs is displayed properly', () => {

			expect(openAllTabsCheckBoxElement).toHaveProperty(
				'checked',
				false
			);

			expect(
				screen.getByText(uploadedTabsToOpen[0]['title'])
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

        // Both Download ,Upload button and Back won't be there as in UploadTabsList Page we have Open Tabs Button
        test('Check if Download Button is absent when the prop for it is set to false', () => {
            expect(screen.queryByText('Download Tabs')).not.toBeInTheDocument();
            expect(screen.queryByText('Upload Tabs')).not.toBeInTheDocument();
            expect(screen.queryByText('Back')).not.toBeInTheDocument();
            expect(screen.queryByText('random-check-1')).not.toBeInTheDocument();
            expect(screen.queryByText('random-check-2')).not.toBeInTheDocument();
            expect(screen.queryByText('random-check-3')).not.toBeInTheDocument();
        });
	});
})