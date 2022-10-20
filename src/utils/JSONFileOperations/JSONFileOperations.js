/*global chrome*/

import { determinUrlType, fileFormats } from "../FileFormat";
import { utils, writeFileXLSX } from 'xlsx';

const downloadFile = (fileData, fileFormat) => {
	// fileData is the JSON data that needs to be stored in file

	if(fileFormat === fileFormats.excel) {
		// create a worksheet using the json data
		const ws = utils.json_to_sheet(fileData);

		// add the worksheet to the new workbook created
		const wb = utils.book_new();
		utils.book_append_sheet(wb, ws, "tabs");

		// download the excel file
		writeFileXLSX(wb, "tabs.xlsx");
	}
	else {
		// stringify the JSON data with tab separation to make it look properly formatted
		const jsonFileData = JSON.stringify(fileData, null, '\t');

		// create a new Blob Object of JSON Format
		const jsonFile = new Blob([jsonFileData], {
			//calls function to determin the correct URL type needed for the file
			type: determinUrlType(fileFormat)
		});

		// create a downloadable URL of the above JSON File
		const jsonURL = URL.createObjectURL(jsonFile);

		// download the JSON file into the local system
		chrome.downloads.download({
			url: jsonURL,
			filename: `tabs.${fileFormat}`,
		});
	}
};

const copyFile = (fileData) => {
	// fileData is the JSON data that needs to be stored in file

	// stringify the JSON data with tab separation to make it look properly formatted
	const jsonFileData = JSON.stringify(fileData, null, '\t');

	var textArea = document.createElement("textarea");
	textArea.value = jsonFileData;

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		document.execCommand('copy');
	} catch (err) {
		console.error('Copying failed.', err);
	}

	document.body.removeChild(textArea);
}

export { downloadFile, copyFile };
