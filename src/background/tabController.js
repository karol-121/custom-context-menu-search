const tabController = {

	setTab(url) {

		if (!url) {

			return;
			
		}

		browser.tabs.create({
      "url": url
    });

	},

	setOptionsPage() {

		browser.runtime.openOptionsPage();

	}
}