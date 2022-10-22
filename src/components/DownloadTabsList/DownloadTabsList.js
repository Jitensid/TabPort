import { useEffect, useState } from 'react';
import useChromeAPIToGetTabs from '../../customhooks/useChromeAPIToGetTabs/useChromeAPIToGetTabs';
import { fileFormats } from '../../utils/FileFormat';
import { copyFile, downloadFile } from '../../utils/JSONFileOperations/JSONFileOperations';
import '../Button.css';
import '../TabsList.css';

const DownloadTabsList = ({ setShowUploadButton }) => {
	// get opened tabs of the current browser window with useChromeAPIToGetTabs hook
	const currentTabsOpen = useChromeAPIToGetTabs()[0];

	// state to store whether user has selected all tabs option or not
	const [downloadAllTabs, setDownloadAllTabs] = useState(true);

	// state to store the tabs that will be downloaded
	const [tabsToDownload, setTabsToDownload] = useState([]);

	// state to validate amount of current open tabs
	const [validateNumberOfTabs, setValidateNumberOfTabs] = useState(true);

	// state to store checkbox states for individual tabs
	const [allTabsCheckBox, setAllTabsCheckBox] = useState(
		currentTabsOpen.map(() => {
			return true;
		})
	);

	//state to store selected file format
	const [fileFormatSelection, setFileFormatSelection] = useState(fileFormats.json);

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

			// set props validateNumberOfTabs if only a single tab open
			if(currentTabsOpen.length <= 1){
				setValidateNumberOfTabs(false);
			}

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
			downloadFile(tabsToDownload, fileFormatSelection);
		}
	};

	const copySelectedTabs = () => {
		// when the button is clicked download all tabs that the user has selected
		if (tabsToDownload.length > 0) {
			// copy selected tabs
			copyFile(tabsToDownload);
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

	const handleFileFormatSelection = (event) => {
		//when file format selection is changed store file format in state
		setFileFormatSelection(event.target.value);
	}

	const showDownloadCheckbox = () => {
		return (
			<div style={{display: validateNumberOfTabs === true ? 'block' : 'none'}}>
				<input
				id="checkboxTabs"
				type="checkbox"
				defaultChecked={downloadAllTabs}
				onChange={handleCheckBoxChange}
				/>
				<label for="checkbox"> Download All Tabs </label>
				<br />
				{downloadAllTabs === false ? showTabsList() : null}
			</div>
		)
	}

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
			<div style={{ marginTop: '60px' }}>
				<div style={{ textAlign: 'left', }} onChange={handleFileFormatSelection}>
					<label>File Format:</label>
					<br />
					<input
						type={"radio"}
						name={"fileType"}
						value={fileFormats.json}
						defaultChecked={fileFormatSelection === fileFormats.json}
					/>
					<label>{fileFormats.json}</label>
					<br />
					<input
						type={"radio"}
						name={"fileType"}
						value={fileFormats.txt}
						defaultChecked={fileFormatSelection === fileFormats.txt}
					/>
					<label>{fileFormats.txt}</label>
					<br />
					<input
						type={"radio"}
						name={"fileType"}
						value={fileFormats.excel}
						defaultChecked={fileFormatSelection === fileFormats.excel}
					/>
					<label>{fileFormats.excel}</label>
				</div>
			</div>
			<br />
			{showDownloadCheckbox()}
			<button
				style={{ marginBottom: '20px' }}
				className="extension_button"
				onClick={downloadSelectedTabs}
			>
				Download Tabs
			</button>
			<button
				style={{ marginBottom: '20px' }}
				className="extension_button"
				onClick={copySelectedTabs}
			>
				Copy Tabs
			</button>
		</div>
	);
};

export default DownloadTabsList;
