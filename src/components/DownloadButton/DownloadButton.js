import useChromeAPIToGetTabs from '../../customhooks/useChromeAPIToGetTabs/useChromeAPIToGetTabs';
import { downloadFile } from '../../utils/JSONFileOperations/JSONFileOperations';
import '../Button.css';

const DownloadButton = () => {
	// get opened tabs of the current browser window with useChromeAPIToGetTabs hook
	const currentTabsOpen = useChromeAPIToGetTabs()[0];

	const handleDownloadButtonClick = () => {
		// if number of opened tabs is greater than 0 in current browser window
		if (currentTabsOpen.length > 0) {
			// call the downloadFile function
			downloadFile(currentTabsOpen);
		}
	};

	return (
		<button class='extension_button' onClick={handleDownloadButtonClick}>
			Download Tabs
		</button>
	);
};

export default DownloadButton;
