/*global chrome*/

import { useEffect, useState } from 'react';

const useChromeAPIToGetTabs = () => {
	// state variable that stores the currently opened tabs
	const [currentTabsOpen, setCurrentTabs] = useState([]);

	// query tabs for of the current browser window
	const queryOptions = { currentWindow: true };

	useEffect(() => {
		// use the chrome API to make the query to get info about the tabs
		chrome.tabs.query(queryOptions, (tabs) => {
			// update the state variable
			setCurrentTabs(
				tabs.map((tab) => ({ title: tab.title, url: tab.url }))
			);
		});
	}, []);

	// return the state variable and the function to change it' state
	return [currentTabsOpen, setCurrentTabs];
};

export default useChromeAPIToGetTabs;
