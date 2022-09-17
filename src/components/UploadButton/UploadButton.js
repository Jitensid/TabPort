/*global chrome*/

import { useEffect, useRef, useState } from 'react';
import useChromeAPIToGetTabs from '../../customhooks/useChromeAPIToGetTabs/useChromeAPIToGetTabs';
import '../Button.css';

const UploadButton = () => {
	// get opened tabs of the current browser window with useChromeAPIToGetTabs hook
	const [currentTabsOpen, setCurrentTabs] = useChromeAPIToGetTabs();

	// state variable to set the jsonFile contents
	const [jsonFile, setjsonFile] = useState(null);

	// making a reference to file input
	const fileInputRef = useRef(null);

	// helper message to display to the user when there is an issue while loading tabs from a JSON file
	const JSON_FILE_PARSING_ERROR_MESSAGE =
		'Sorry! Uploaded File cannot be Read.\nSuggestion: Please Make sure that file is not edited';

	useEffect(() => {
		// call the function that opens tabs if JSON file is valid
		launchAllTabs();

		return () => {};
	}, [jsonFile]);

	const launchAllTabs = () => {
		// if state is null implies no file selected then do nothing
		if (jsonFile === null) {
			return;
		}

		// create a fileReader Object Instance to read contents of the JSON File
		const fileReader = new FileReader();

		// read the contents of the selected file as text
		fileReader.readAsText(jsonFile);

		// when fileReader is ready
		fileReader.onload = (event) => {
			try {
				handleFileReaderSuccessEvent(event.target.result);
			} catch (error) {
				alert(JSON_FILE_PARSING_ERROR_MESSAGE);
			}
		};

		// display an error message to the user if the file cannot be read
		// for any reason
		fileReader.onerror = (error) => {
			alert(JSON_FILE_PARSING_ERROR_MESSAGE);
		};
	};

	// function to be called when fileReader successfully reads the text from the uploaded file
	const handleFileReaderSuccessEvent = (fileReaderResult) => {
		// parse the JSON object from the uploaded JSON file
		const newTabsToOpen = JSON.parse(fileReaderResult);

		// iterate all the tabs and launch the tabs into the browser
		newTabsToOpen.map((tab) => {
			chrome.tabs.create({
				url: tab.url,
			});
		});

		// update the state variable to add new tabs from file also
		setCurrentTabs([...currentTabsOpen, ...newTabsToOpen]);
	};

	const handleUploadButtonClick = () => {
		// launch a file uploader dialog window after the upload button is clicked
		fileInputRef.current.click();
	};

	const handleFileUpload = (event) => {
		// get the uploaded file
		const uploadedFile = event.target.files[0];

		// update the jsonFile state variable
		setjsonFile(uploadedFile);

		// later reset the file input form
		event.target.value = null;
	};

	return (
		<div>
			<input
				data-testid="fileInputRef"
				ref={fileInputRef}
				type="file"
				onChange={handleFileUpload}
				accept="application/JSON"
				style={{ opacity: 0 }}
			/>
			<button class="extension_button" onClick={handleUploadButtonClick}>
				Upload Tabs
			</button>
		</div>
	);
};

export default UploadButton;
