/*global chrome*/

import { determinUrlType, fileFormats } from "../FileFormat";

const downloadFile = (fileData, fileFormat) => {
	// fileData is the JSON data that needs to be stored in file

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
};

export { downloadFile };
