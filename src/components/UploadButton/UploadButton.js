/*global chrome*/

import { useEffect, useRef, useState } from 'react';
import useChromeAPIToGetTabs from '../../customhooks/useChromeAPIToGetTabs/useChromeAPIToGetTabs';
import UploadTabsList from '../UploadTabsList/UploadTabsList';
import '../Button.css';
import { fileFormats } from '../../utils/FileFormat';
import { read, utils } from 'xlsx';

const UploadButton = ({showDownloadButton, setShowDownloadButton}) => {
	// get opened tabs of the current browser window with useChromeAPIToGetTabs hook
	const [currentTabsOpen, setCurrentTabs] = useChromeAPIToGetTabs();

	// state variable to set the jsonFile contents
	const [jsonFile, setjsonFile] = useState(null);

	// state variable to store all the uploaded tabs with title and url
	const [uploadedTabsToOpen, setUploadedTabsToOpen] = useState([]);

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

		// update the uploadedTabsToOpen state
		setUploadedTabsToOpen(prev => {
			const current = [];
			newTabsToOpen.map((tab) => {
				current.push(tab);
			})
			return current;
		})

		// update the state variable to add new tabs from file also
		setCurrentTabs([...currentTabsOpen, ...newTabsToOpen]);
	};

	const handleUploadButtonClick = () => {

		// hide the download button
		setShowDownloadButton(prev => !prev);

		// launch a file uploader dialog window after the upload button is clicked
		fileInputRef.current.click();
	};

	const handleFileUpload = (event) => {
		// get the uploaded file
		const uploadedFile = event.target.files[0];

		if (fileInputRef.current.files[0].name == undefined) {
			alert(`File not defined`);
			return;
		}

		// get the file extension
		const file_extension = fileInputRef.current.files[0].name.split('.')[1];

		// Only json, txt and xlsx file format are supported by TabPort
		if (
			file_extension === fileFormats.excel ||
			file_extension === fileFormats.json ||
			file_extension === fileFormats.txt
		) {
			if (file_extension === fileFormats.excel) {
				// create a fileReader Object Instance to read contents of the excel file
				const fileReader = new FileReader();

				// read the excel file as an array buffer
				fileReader.readAsArrayBuffer(uploadedFile);

				fileReader.onload = function (event) {
					// get the worksheet by reading the array buffer file
					const fileArrayBuffer = event.target.result;
					const wb = read(fileArrayBuffer, { type: 'buffer' });
					const ws = wb.Sheets[wb.SheetNames[0]];

					// convert the worksheet to json
					const data = utils.sheet_to_json(ws);

					// create a json blob of uploaded excel file
					const excelToJSONBlob = new Blob(
						[JSON.stringify(data, null, 2)],
						{
							type: 'application/json',
						}
					);

					setjsonFile(excelToJSONBlob);
				};
			} else {
				// update the jsonFile state variable
				setjsonFile(uploadedFile);
			}
		} else {
			alert(`.${file_extension} file format not supported`);
		}

		// later reset the file input form
		event.target.value = null;
	};

	return (
		<div>
			{ (uploadedTabsToOpen.length === 0) ?
			<div>
				<input
					data-testid="fileInputRef"
					ref={fileInputRef}
					type="file"
					onChange={handleFileUpload}
					style={{ opacity: 0 }}
				/>
				<button class="extension_button" onClick={handleUploadButtonClick}>
					Upload Tabs
				</button>
			</div> :
			<UploadTabsList uploadedTabsToOpen={uploadedTabsToOpen}/>
			}
		</div>
	);
};

export default UploadButton;
