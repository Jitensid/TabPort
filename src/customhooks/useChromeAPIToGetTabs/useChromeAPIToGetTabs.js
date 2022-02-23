/*global chrome*/

import { useEffect, useState } from 'react';

const useChromeAPIToGetTabs = () => {
	const [currentTabsOpen, setCurrentTabs] = useState([]);

	const queryOptions = { currentWindow: true };

	useEffect(() => {
		chrome.tabs.query(queryOptions, (tabs) => {
			setCurrentTabs(
				tabs.map((tab) => ({ title: tab.title, url: tab.url }))
			);
		});
	}, []);

	return [currentTabsOpen, setCurrentTabs];
};

export default useChromeAPIToGetTabs;
