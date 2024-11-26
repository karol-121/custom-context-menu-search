const file = {

	async extractFromFile (file) {

		console.log(file);
		
		const userItems = {
			items: []
		}

		//test for size && format
		if (file.type != "application/json" || file.size > 1000) {

			//todo: change max file size later 
			userItems.error = true;
			userItems.errorMessage = "wrong file format or file size too big";
			return userItems;

		} 		

		// idunno what file.text() returns in case of failure
		// todo: find that out and test for it
		// seems to work ok for now
		const result = await file.text();

		if (!result) {

			userItems.error = true;
			userItems.errorMessage = "unable to read the file";
			return userItems;

		}

		console.log(result);

		//try to parse to json
		let resultJSON;

		try {

			resultJSON = JSON.parse(result);	

		} catch(e) {

			userItems.error = true;
			userItems.errorMessage = "invalid json format";
			return userItems;

		}

		console.log(resultJSON);

		//convert generic json to compatibile user data

		//return compatibile user data 

		return userItems;
	}


}