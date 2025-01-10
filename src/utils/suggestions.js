const suggestion_items = [
	{
		title: "Google",
		url: "https://www.google.com/search?q=",	
	},
	{
		title: "DuckDuckGo",
		url: "https://duckduckgo.com/?t=ffab&q=",	
	},
	{
		title: "Bing",
		url: "https://www.bing.com/search?q=",	
	},
	{
		title: "Startpage",
		url: "https://www.startpage.com/sp/search?q=",	
	},
	{
		title: "Ecosia",
		url: "https://www.ecosia.org/search?q=",	
	},

];

function getSuggestions(keyword, limit) {

	if (limit > suggestion_items.length) {
		limit = suggestion_items.length;
	}

	const filtered_suggestions = [];
	let count = 0;

	for (suggestion_item of suggestion_items) {

		// todo: make search case insensitive
		if (suggestion_item.title.search(keyword) >= 0) {
			filtered_suggestions.push(suggestion_item);
			count++;
		}

		if (count >= limit) {
			break;
		}

	}

	return filtered_suggestions;

}

function getSuggestionByTitle(title) {

	for (suggestion_item of suggestion_items) {


		// todo: consider other options to search insted of "includes"
		if (suggestion_item.title.includes(title)) {

			return suggestion_item;

		}

	}

	return -1;

}
