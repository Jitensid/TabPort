import { useState } from 'react';
import './App.css';
import DownloadButton from './components/DownloadButton/DownloadButton';
import UploadButton from './components/UploadButton/UploadButton';

const App = () => {
	// state to whether or not show the uploadButton
	// initially show the Upload Tabs Button Component
	const [showUploadButton, setShowUploadButton] = useState(true);

	// state to whether or not show the downloadButton
	// initially show the Download Tabs Button Component
	const [showDownloadButton, setShowDownloadButton] = useState(true);

	return (
		<div className="App">
			<header className="App-header">
				{showDownloadButton === true ?
				<DownloadButton
					showUploadButton={showUploadButton}
					setShowUploadButton={setShowUploadButton}
				/> :
				null}
				{showUploadButton === true ? 
				<UploadButton 
					showDownloadButton={showDownloadButton} 
					setShowDownloadButton={setShowDownloadButton}
				/> : 
				null}
			</header>
		</div>
	);
};

export default App;
