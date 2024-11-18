const storageController = {

	setStorage(data) {

		browser.storage.local.set(data);

	},

	async getStorage() {

		return await browser.storage.local.get();
		
	}
}