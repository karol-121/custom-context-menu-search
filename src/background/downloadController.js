const downloadController = {

	async downloadFile(file, name) {

		if (!file || !name) {

			return false;

		}

		let fileUrl; 

		try {

			fileUrl = URL.createObjectURL(file);

		} catch(e) {

			return false;

		}

		const downloadConfig = {
			url: fileUrl,
			filename: name,
			saveAs: true
		}

		const download = await this.setDownload(downloadConfig);

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

		try {

			return browser.downloads.download(data).then(this.onSuccess, this.onError);

		} catch(e) {

			return false;

		}

	},

	onSuccess(e) {

		return e;

	},

	onError(e) {

		//prevent browser.downloads.download() from returning an error while user cancels the download
		//this is so it can be treaded different that other errors
		if (e == "Error: Download canceled by the user") {

			return -1;

		}

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