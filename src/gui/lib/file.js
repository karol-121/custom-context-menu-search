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

			if (importItem.separator) {

				let separator = new ContextMenuSeparator();

				userItems.items.push(separator.export());
				itemCount++;
				continue;

			}

			if (importItem.urls) {

				if (!ContextMenuGroup.validateTitle(importItem.title)) {
					
					userItems.error = true;
					userItems.errorMessage = "(Item: " + itemCount + ")"; //todo error message
					return userItems;

				}

				if (!ContextMenuGroup.validateUrls(importItem.urls)) {
					
					userItems.error = true;
					userItems.errorMessage = "(Item: " + itemCount + ")"; //todo error message
					return userItems;

				}

				let group = new ContextMenuGroup(importItem.title, importItem.urls);

				userItems.items.push(group.export());
				itemCount++;
				continue;
				
			}

			if (importItem.url) {

				if (!ContextMenuItem.validateTitle(importItem.title)) {

					userItems.error = true;
					userItems.errorMessage = "(Item: " + itemCount + ") " + MESSAGE_INVALID_TITLE;
					return userItems;

				}

				if (!ContextMenuItem.validateUrl(importItem.url)) {

					userItems.error = true;
					userItems.errorMessage = "(Item: " + itemCount + ") " + MESSAGE_INVALID_URL;
					return userItems;

				}

				let item = new ContextMenuItem(importItem.title, importItem.url);

				userItems.items.push(item.export());
				itemCount++;
				
			}


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

			const exportItem = {};

			if (ItemManager.isGroup(item)) {

				exportItem.title = item.title;
				exportItem.urls = item.actions;

				exportJSON.context_menu_items.push(exportItem);
				continue;

			}

			if (ItemManager.isSeparator(item)) {

				exportItem.separator = "separator";

				exportJSON.context_menu_items.push(exportItem);
				continue;

			}

			if (ItemManager.isItem(item)) {
				
				exportItem.title = item.title;
				exportItem.url = item.action;

				exportJSON.context_menu_items.push(exportItem);
				continue;

			}

		}

		return this.jsonToBlob(exportJSON);

	},

	jsonToBlob(json) {

		return new Blob([JSON.stringify(json, null, 2)], {
  		type: "application/json",
		});

	}

}