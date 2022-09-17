import { useState } from 'react';
import './App.css';
import DownloadButton from './components/DownloadButton/DownloadButton';
import UploadButton from './components/UploadButton/UploadButton';

const App = () => {
	// state to whether or not show the uploadButton
	// initially show the Upload Tabs Buttpn Component
	const [showUploadButton, setShowUploadButton] = useState(true);

	return (
		<div className="App">
			<header className="App-header">
				<DownloadButton
					showUploadButton={showUploadButton}
					setShowUploadButton={setShowUploadButton}
				/>
				{showUploadButton === true ? <UploadButton /> : null}
			</header>
		</div>
	);
};

export default App;
