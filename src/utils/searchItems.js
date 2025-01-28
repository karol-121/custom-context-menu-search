function getSearchItems(keyword, maxCount) {

	if (maxCount > searchItems.length) {

		maxCount = searchItems.length;

	}

	const filteredSearchItems = [];
	let count = 0;

	for (searchItem of searchItems) {

		if (searchItem.title.toUpperCase().search(keyword.toUpperCase()) >= 0) {

			filteredSearchItems.push(searchItem);
			count++;

		}

		if (count >= maxCount) {

			break;

		}

	}

	return filteredSearchItems;

}

function getSearchItemByTitle(title) {

	for (searchItem of searchItems) {

		if (searchItem.title.includes(title)) {

			return searchItem;

		}

	}

	return -1;

}

// the first 5 items defined here will be shown as deafult
const searchItems = [
	{
		title: "Google",
		url: "https://www.google.com/search?q=",	
	},
	{
		title: "Startpage",
		url: "https://www.startpage.com/sp/search?q=",	
	},
	{
		title: "Google Maps",
		url: "https://www.google.com/maps/search/",	
	},
	{
		title: "TheFreeDictionary",
		url: "https://www.thefreedictionary.com/",	
	},
	{
		title: "Youtube",
		url: "https://www.youtube.com/results?search_query=",	
	},
	{
		title: "Bing",
		url: "https://www.bing.com/search?q=",	
	},
	{
		title: "DuckDuckGo",
		url: "https://duckduckgo.com/?t=ffab&q=",	
	},
	{
		title: "Ecosia",
		url: "https://www.ecosia.org/search?q=",	
	},
	{
		title: "Bandcamp",
		url: "https://bandcamp.com/search?q=",	
	},
	{
		title: "Soundcloud",
		url: "https://soundcloud.com/search?q=",	
	},
	{
		title: "Reddit",
		url: "https://www.reddit.com/search/?q=",	
	},
	{
		title: "OpenStreetMap",
		url: "https://www.openstreetmap.org/search?query=",	
	},
	
	{
		title: "Stack Overflow",
		url: "https://stackoverflow.com/search?q=",	
	},
	{
		title: "Google Translate",
		url: "https://translate.google.com/?text=",	
	},
	{
		title: "Thesaurus",
		url: "https://www.thesaurus.com/browse/",	
	},


];
