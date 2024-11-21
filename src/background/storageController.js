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

		return browser.storage.local.set(data).then(this.onSetSuccess, this.onError);

	},

	getStorage() {

		return browser.storage.local.get().then(this.onGetSuccess, this.onError);
		
	},


	onGetSuccess(e) {

		return e;

	},

	onSetSuccess() {

		return true;

	},

	onError() {

		return false;

	}

}