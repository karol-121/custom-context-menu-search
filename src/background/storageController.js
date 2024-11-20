const storageController = {

	onStorageChanged: null,

	async setData(data) {

		let success = await this.setStorage(data);

		if (success) {
			this.onStorageChanged();
		} 

		return success;

	},


	async getData() {

		 return await this.getStorage();

	},

	setStorage(data) {

		//todo: refactor onSuccess, onError functions
		return browser.storage.local.set(data).then(this.onSetSuccess, this.onError);

	},

	getStorage() {

		//todo: refactor onSuccess, onError functions
		return browser.storage.local.get().then(this.onSuccess, this.onError);
		
	},

	onError() {
		return false;
	},

	onSuccess(e) {
		return e;
	},

	onSetSuccess() {
		return true;
	}
}