const file = {

	async extractFromFile (file) {
		
		const userItems = {
			items: []
		}

		if (file.type != "application/json" || file.size > 10000 || file.size < 1) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_INVALID_FILE_TYPE;
			return userItems;

		} 		

		// idunno what file.text() returns in case of failure
		// todo: find that out and test for it
		// seems to work ok for now
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

		if (!genericJSON.items || genericJSON.items.length === 0) {

			userItems.error = true;
			userItems.errorMessage = MESSAGE_NO_DATA;
			return userItems;

		}

		let itemCount = 1;

		for (item of genericJSON.items) {

			if (!validateTitle(item.title)) {

				userItems.error = true;
				userItems.errorMessage = "(Item: " + itemCount + ") " + MESSAGE_INVALID_TITLE;
				return userItems;

			}

			if (!validateUrl(item.action)) {

				userItems.error = true;
				userItems.errorMessage = "(Item: " + itemCount + ") " + MESSAGE_INVALID_URL;
				return userItems;

			}

			const userItem = {
				id: randomId.generateNewId(),
				title: item.title,
				context: ['selection'],
				action: item.action
			}

			userItems.items.push(userItem);
			itemCount++;

		}

		return userItems;

	},

	createFromData (data) {

		//todo: convert data to generic json (stip uneeded data)

		const blob = new Blob([JSON.stringify(data, null, 2)], {
  		type: "application/json",
		});

		return blob;

	}

}