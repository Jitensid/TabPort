import useChromeAPIToGetTabs from '../../customhooks/useChromeAPIToGetTabs/useChromeAPIToGetTabs';
import '../Button.css';
import DownloadTabsList from '../DownloadTabsList/DownloadTabsList';

const DownloadButton = ({ showUploadButton, setShowUploadButton }) => {
	// get opened tabs of the current browser window with useChromeAPIToGetTabs hook
	const currentTabsOpen = useChromeAPIToGetTabs()[0];

	const handleDownloadButtonClick = () => {
		// if number of opened tabs is greater than 0 in current browser window
		if (currentTabsOpen.length > 0) {
			// hide the upload tabs button
			setShowUploadButton(false);
		}
	};

	const displayAppropriateComponent = () => {
		// if uploadButton show state is true
		if (showUploadButton === true) {
			return (
				// show the download tabs button only
				<button
					class='extension_button'
					onClick={handleDownloadButtonClick}>
					Download Tabs
				</button>
			);
		}

		// else show this component
		return <DownloadTabsList setShowUploadButton={setShowUploadButton} />;
	};

	return <>{displayAppropriateComponent()}</>;
};

export default DownloadButton;
