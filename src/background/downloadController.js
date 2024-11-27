const downloadController = {

	async downloadFile(file, name) {

		//todo: test paramteres

		let fileUrl = URL.createObjectURL(file);

		//todo: test for fileUrl

		const downloadConfig = {
			url: fileUrl,
			filename: name,
			saveAs: true
		}

		let download = await this.setDownload(downloadConfig);

		if (!download) {

			console.log("revoking object url");
			URL.revokeObjectURL(fileUrl);
			return download; //check if this is really needed,

		}

		if (!browser.downloads.onChanged.hasListener(this.afterDownload)) {

			browser.downloads.onChanged.addListener(this.afterDownload);

		}


		return download;

	},

	setDownload(data) {

		return browser.downloads.download(data).then(this.onSuccess, this.onError);

	},

	onSuccess(e) {

		return e;

	},

	onError() {

		return false;

	},

	afterDownload(e) {
		
		console.log("revoking object url");
		// this.fileUrl = URL.revokeObjectURL(this.fileUrl);

		//todo: use downloads.search() to find and revoke fileurl in question

	}

}