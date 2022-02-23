/*global chrome*/

import { useEffect, useRef, useState } from 'react';
import useChromeAPIToGetTabs from '../../customhooks/useChromeAPIToGetTabs/useChromeAPIToGetTabs';
import '../Button.css';

const UploadButton = () => {
	const [currentTabsOpen, setCurrentTabs] = useChromeAPIToGetTabs();
	const [jsonFile, setjsonFile] = useState(null);

	const fileInputRef = useRef(null);

	useEffect(() => {
		launchAllTabs();
	}, [jsonFile]);

	const launchAllTabs = () => {
		if (jsonFile === null) {
			return;
		}

		// create a fileReader Object Instance to read contents of the JSON File
		const fileReader = new FileReader();

		fileReader.readAsText(jsonFile);

		fileReader.addEventListener(
			'load',
			() => {
				const newTabsToOpen = JSON.parse(fileReader.result);

				newTabsToOpen.map((tab) => {
					chrome.tabs.create({
						url: tab.url,
					});
				});

				setCurrentTabs([...currentTabsOpen, ...newTabsToOpen]);
			},
			false
		);
	};

	const handleUploadButtonClick = () => {
		// launch a file uploader dialog window after the upload button is clicked
		fileInputRef.current.click();
	};

	const handleFileUpload = (event) => {
		const uploadedFile = event.target.files[0];
		setjsonFile(uploadedFile);
		launchAllTabs();
	};

	return (
		<div>
			<input
				ref={fileInputRef}
				type='file'
				onChange={handleFileUpload}
				accept='application/JSON'
				style={{ opacity: 0 }}
			/>
			<button class='extension_button' onClick={handleUploadButtonClick}>
				Upload Tabs
			</button>
		</div>
	);
};

export default UploadButton;
