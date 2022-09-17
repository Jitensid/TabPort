import { useEffect, useState } from 'react';
import useChromeAPIToGetTabs from '../../customhooks/useChromeAPIToGetTabs/useChromeAPIToGetTabs';
import { downloadFile } from '../../utils/JSONFileOperations/JSONFileOperations';
import '../Button.css';
import './DownloadTabsList.css';

const DownloadTabsList = ({ setShowUploadButton }) => {
	// get opened tabs of the current browser window with useChromeAPIToGetTabs hook
	const currentTabsOpen = useChromeAPIToGetTabs()[0];

	// state to store whether user has selected all tabs option or not
	const [downloadAllTabs, setDownloadAllTabs] = useState(true);

	// state to store the tabs that will be downloaded
	const [tabsToDownload, setTabsToDownload] = useState([]);

	// state to store checkbox states for individual tabs
	const [allTabsCheckBox, setAllTabsCheckBox] = useState(
		currentTabsOpen.map(() => {
			return true;
		})
	);

	useEffect(() => {
		if (currentTabsOpen.length > 0) {
			// store all tabs opened in browser window in currentTabs state
			setTabsToDownload(
				currentTabsOpen.map((current_tab) => {
					return current_tab;
				})
			);

			// set checkbox to download all tabs to true
			setDownloadAllTabs(true);

			// set the state for all checkboxes to true
			setAllTabsCheckBox(
				currentTabsOpen.map(() => {
					return true;
				})
			);
		}
	}, [currentTabsOpen]);

	useEffect(() => {
		// update array to store tabs to download
		let updatedTabsToDownload = [];

		// iterate all opened tabs
		for (
			let tab_index = 0;
			tab_index < currentTabsOpen.length;
			tab_index++
		) {
			// if the tab is checked by the user
			if (allTabsCheckBox[tab_index] === true) {
				// push it into newTabsToDownload array
				updatedTabsToDownload.push(currentTabsOpen[tab_index]);
			}
		}

		// update the tabsToDownload state
		setTabsToDownload(updatedTabsToDownload);
	}, [allTabsCheckBox]);

	const downloadSelectedTabs = () => {
		// when the button is clicked download all tabs that the user has selected
		if (tabsToDownload.length > 0) {
			// download selected tabs
			downloadFile(tabsToDownload);
		}
	};

	// if all tabs option checkbox is clicked
	const handleCheckBoxChange = () => {
		// update the state accordingly
		setDownloadAllTabs(!downloadAllTabs);

		// set the state for all checkboxes to true
		setAllTabsCheckBox(
			currentTabsOpen.map(() => {
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
				{currentTabsOpen.map((element, index) => {
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

	const handleBackButtonClick = () => {
		// when back button is clicked show download and upload tabs button again
		setShowUploadButton(true);
	};

	return (
		<div>
			<div>
				<button
					className="extension_button top_left_secondary_button"
					onClick={handleBackButtonClick}
				>
					Back
				</button>
			</div>
			<br />
			<input
				style={{ marginTop: '40px' }}
				type="checkbox"
				defaultChecked={downloadAllTabs}
				onChange={handleCheckBoxChange}
			/>
			<label for="checkbox"> Download All Tabs </label>
			<br />
			{downloadAllTabs === false ? showTabsList() : null}
			<button
				style={{ marginBottom: '20px' }}
				className="extension_button"
				onClick={downloadSelectedTabs}
			>
				Download Tabs
			</button>
		</div>
	);
};

export default DownloadTabsList;
