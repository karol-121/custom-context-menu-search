const tabController = {

	setTab(url, discarded) {

		if (!url) {

			return;
			
		}

		browser.tabs.create({
      "url": url,
      "discarded": discarded
    });

	},

	setOptionsPage() {

		browser.runtime.openOptionsPage();

	}
}