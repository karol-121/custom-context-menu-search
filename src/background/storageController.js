const storageController = {
	onStorageSet: null,

	setStorage(data) {

		browser.storage.local.set(data);
		this.onStorageSet();

	},

	async getStorage() {

		return await browser.storage.local.get();
		
	}
}