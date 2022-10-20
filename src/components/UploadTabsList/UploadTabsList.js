/* global chrome */

import { useEffect, useState } from 'react';
import '../Button.css';
import '../TabsList.css';

export default function UploadTabsList({uploadedTabsToOpen}) {

	// state to store whether user has selected all tabs option or not
	const [openAllTabs, setOpenAllTabs] = useState(true);

	// state to store the tabs that will be opened
    const [tabsToOpen, setTabsToOpen] = useState(
        uploadedTabsToOpen.map((element) => {return element.url;})
    );

    // state to store checkbox states for individual tabs
	const [allTabsCheckBox, setAllTabsCheckBox] = useState(
        uploadedTabsToOpen.map(() => {return true;})
    );

    useEffect(() => {
		// update array to store tabs to open
		let updatedTabsToOpen = [];

		// iterate all tabs
		for (
			let tab_index = 0;
			tab_index < uploadedTabsToOpen.length;
			tab_index++
		) {
			// if the tab is checked by the user
			if (allTabsCheckBox[tab_index] === true) {
				// push it into updatedTabsToOpen array
				updatedTabsToOpen.push(uploadedTabsToOpen[tab_index].url);
			}
		}

		// update the tabsToOpen state
		setTabsToOpen(updatedTabsToOpen);
    }, [allTabsCheckBox]);

    function handleOpenButtonClick() {
		// when the button is clicked open all tabs that the user has selected
        tabsToOpen.map((tab) => {
            // open selected tabs
            chrome.tabs.create({
                url: tab,
            });
        })
    }


	// if all tabs option checkbox is clicked
	const handleCheckBoxChange = () => {
		// update the state accordingly
		setOpenAllTabs(!openAllTabs);

		// set the state for all checkboxes to true
		setAllTabsCheckBox(
			uploadedTabsToOpen.map(() => {
				return true;
			})
		);
	};

	const handleSingleTabCheckBoxChange = (event, index) => {
		// if checkbox for that tab was selected
		if (allTabsCheckBox[index] === true) {
			// grab the status of checkboxes of all tabs
			const updatedAllTabsCheckBox = allTabsCheckBox.map(
				(tab_checkbox) => {
					return tab_checkbox;
				}
			);

			// set the status of the checkbox to false
			updatedAllTabsCheckBox[index] = false;

			// update the state accordingly
			setAllTabsCheckBox(updatedAllTabsCheckBox);
		} else {
			// grab the status of checkboxes of all tabs
			const updatedAllTabsCheckBox = allTabsCheckBox.map(
				(tab_checkbox) => {
					return tab_checkbox;
				}
			);

			// set the status of the checkbox to false
			updatedAllTabsCheckBox[index] = true;

			// update the state accordingly
			setAllTabsCheckBox(updatedAllTabsCheckBox);
		}
	};

	const showTabsList = () => {
		// show  the title of all tabs of the current browser window

		return (
			<div className="tabs_list_div_element">
				{/* iterate all the tabs and add tab list div element*/}
				{uploadedTabsToOpen.map((element, index) => {
					return (
						<div key={index} className="tabs_list_element">
							<label
								htmlFor={'single_tab_' + index}
								style={{
									wordBreak: 'break-word',
								}}
							>
								<input
									data-testid={'single_tab_' + index}
									onChange={(event) =>
										handleSingleTabCheckBoxChange(
											event,
											index
										)
									}
									type="checkbox"
									defaultChecked={allTabsCheckBox[index]}
								/>
								{element.title}
							</label>
							<br />
						</div>
					);
				})}
			</div>
		);
	};

    return (
        <div>
            <br />
            <input
                type="checkbox"
                defaultChecked={openAllTabs}
                onChange={handleCheckBoxChange}
            />
            <label for="checkbox"> Open All Tabs </label>
            <br />
			{openAllTabs === false ? showTabsList() : null}            
            <button class="extension_button" onClick={handleOpenButtonClick}>
                Open Tabs
            </button>
        </div>
    )
}