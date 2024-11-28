const file = {

	async extractFromFile(file) {
		
		const userItems = {
			items: []
		}

		if (file.type != "application/json" || file.size > 10000 || file.size < 1) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_INVALID_FILE_TYPE;
			return userItems;

		} 		

		const rawText = await file.text();

		if (!rawText) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_FAILED_FILE_READING;
			return userItems;

		}

		let genericJSON;

		try {

			genericJSON = JSON.parse(rawText);	

		} catch (e) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_INVALID_JSON;
			return userItems;

		}

		if (!genericJSON.context_menu_items || genericJSON.context_menu_items.length === 0) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_NO_DATA;
			return userItems;

		}

		let itemCount = 1;

		for (item of genericJSON.context_menu_items) {

			if (!validateTitle(item.title)) {

				userItems.error = true;
				userItems.errorMessage = "(Item: " + itemCount + ") " + MESSAGE_INVALID_TITLE;
				return userItems;

			}

			if (!validateUrl(item.url)) {

				userItems.error = true;
				userItems.errorMessage = "(Item: " + itemCount + ") " + MESSAGE_INVALID_URL;
				return userItems;

			}

			const userItem = {
				id: randomId.generateNewId(),
				title: item.title,
				contexts: ['selection'],
				action: item.url
			}

			userItems.items.push(userItem);
			itemCount++;

		}

		return userItems;

	},

	createFromStorageData(storageData) {

		if (!storageData.items) {

			return;

		}

		const exportJSON = {
			context_menu_items: []
		};

		for (item of storageData.items) {

			const exportItem = {
				title: item.title,
				url: item.action
			}

			exportJSON.context_menu_items.push(exportItem);

		}

		const blob = new Blob([JSON.stringify(exportJSON, null, 2)], {
  		type: "application/json",
		});

		return blob;

	}

}