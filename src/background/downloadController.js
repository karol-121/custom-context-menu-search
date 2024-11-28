const downloadController = {

	async downloadFile(file, name) {

		if (!file || !name) {

			return false;

		}

		let fileUrl = URL.createObjectURL(file);

		const downloadConfig = {
			url: fileUrl,
			filename: name,
			saveAs: true
		}

		let download = await this.setDownload(downloadConfig);

		if (!download) {

			URL.revokeObjectURL(fileUrl);
			return download;

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

	async afterDownload(e) {

		if (!e.id) {

			return;

		}
		
		let downloaded = await browser.downloads.search({id: e.id});

		if (!downloaded[0].url) {

			return;
			
		}

		URL.revokeObjectURL(downloaded[0].url);

	}

}