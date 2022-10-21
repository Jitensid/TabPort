import { fireEvent, render, screen } from '@testing-library/react';
import UploadTabsList from '../../../components/UploadTabsList/UploadTabsList';

describe('UploadTabsList component working properly', () => {
    let openAllTabsCheckBoxElement;
    let openTabsButtonElementOfUploadTabsListComponent;

    beforeEach(() => {
        render(
			<UploadTabsList
                uploadedTabsToOpen={["google.com"]}				
			/>
		);
    });
    
	afterEach(() => {
		jest.restoreAllMocks();
	});

    test('Open Tabs Button and Open All Tabs is rendered properly', () => {
        // Open All Tabs Checkbox
        openAllTabsCheckBoxElement = screen.getByRole('checkbox');

        // Open Tabs Button
        openTabsButtonElementOfUploadTabsListComponent =
            screen.getByRole('button', {
                name: 'Open Tabs',
            });
		// Checking if the checkbox and open tabs button is present or not
		expect(openAllTabsCheckBoxElement).toBeInTheDocument();
		expect(
			openTabsButtonElementOfUploadTabsListComponent
		).toBeInTheDocument();
    })

	test('OpenAllTabsCheckbox is already checked by default', () => {
        // Open All Tabs Checkbox
        openAllTabsCheckBoxElement = screen.getByRole('checkbox');

		// test if the downloadAllTabsCheckBox is by default checked
		expect(openAllTabsCheckBoxElement).toHaveProperty('checked', true);
	});
})