import './App.css';
import DownloadButton from './components/DownloadButton/DownloadButton';
import UploadButton from './components/UploadButton/UploadButton';

const App = () => {
	return (
		<div className='App'>
			<header className='App-header'>
				<DownloadButton />
				<UploadButton />
			</header>
		</div>
	);
};

export default App;
