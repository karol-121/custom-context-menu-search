const tabController = {

	setTab(url, discarded) {

		browser.tabs.create({
    	"url": url,
    	"discarded": discarded
  	});

	},

	setOptionsPage() {

		browser.runtime.openOptionsPage();

	}
	
}