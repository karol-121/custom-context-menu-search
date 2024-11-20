const storageController = {
	onStorageSet: null,

	async setStorage(data) {

		await browser.storage.local.set(data);
		this.onStorageSet();

	},

	async getStorage() {

		return await browser.storage.local.get();
		
	}
}