const file = {

	async getUserData(file) {
		
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

		let importJSON;

		try {

			importJSON = JSON.parse(rawText);	

		} catch (e) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_INVALID_JSON;
			return userItems;

		}

		if (!importJSON.context_menu_items || importJSON.context_menu_items.length === 0) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_NO_DATA;
			return userItems;

		}

		let itemCount = 1;

		for (importItem of importJSON.context_menu_items) {

			if (!validateTitle(importItem.title)) {

				userItems.error = true;
				userItems.errorMessage = "(Item: " + itemCount + ") " + MESSAGE_INVALID_TITLE;
				return userItems;

			}

			if (!validateUrl(importItem.url)) {

				userItems.error = true;
				userItems.errorMessage = "(Item: " + itemCount + ") " + MESSAGE_INVALID_URL;
				return userItems;

			}

			userItems.items.push(new contextMenuItem(importItem.title, importItem.url));
			itemCount++;

		}

		return userItems;

	},

	createFromUserData(userData) {

		const exportJSON = {
			context_menu_items: []
		};

		if (!userData.items) {

			return this.jsonToBlob(exportJSON);

		}

		for (item of userData.items) {

			const exportItem = {
				title: item.title,
				url: item.action
			}

			exportJSON.context_menu_items.push(exportItem);

		}

		return this.jsonToBlob(exportJSON);

	},

	jsonToBlob(json) {

		return new Blob([JSON.stringify(json, null, 2)], {
  		type: "application/json",
		});

	}

}