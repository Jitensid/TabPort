import useChromeAPIToGetTabs from '../../customhooks/useChromeAPIToGetTabs/useChromeAPIToGetTabs';
import { downloadFile } from '../../utils/JSONFileOperations/JSONFileOperations';
import '../Button.css';

const DownloadButton = () => {
	const currentTabsOpen = useChromeAPIToGetTabs()[0];

	const handleDownloadButtonClick = () => {
		if (currentTabsOpen.length > 0) {
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
