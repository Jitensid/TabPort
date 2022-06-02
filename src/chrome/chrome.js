/*global chrome*/

global.chrome = {
	tabs: {
		create: jest.fn(),
		query: jest.fn(),
	},
	downloads: {
		download: jest.fn(),
	},
};

export default chrome;
