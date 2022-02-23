/*global chrome*/

const downloadFile = (fileData) => {
	const jsonFileData = JSON.stringify(fileData, null, '\t');
	const jsonFile = new Blob([jsonFileData], { type: 'application/json' });
	const jsonURL = URL.createObjectURL(jsonFile);
	chrome.downloads.download({
		url: jsonURL,
		filename: 'tabs.json',
	});
};

export { downloadFile };
