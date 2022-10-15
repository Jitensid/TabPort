/*global chrome*/

const downloadFile = (fileData) => {
	// fileData is the JSON data that needs to be stored in file

	// stringify the JSON data with tab separation to make it look properly formatted
	const jsonFileData = JSON.stringify(fileData, null, '\t');

	// create a new Blob Object of JSON Format
	const jsonFile = new Blob([jsonFileData], { type: 'application/json' });

	// create a downloadable URL of the above JSON File
	const jsonURL = URL.createObjectURL(jsonFile);

	// download the JSON file into the local system
	chrome.downloads.download({
		url: jsonURL,
		filename: 'tabs.json',
	});
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
