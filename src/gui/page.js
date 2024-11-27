async function getUserDataFromStorage() {

	table.resetTable();

	let userItems = await browser.runtime.sendMessage({action: "getData"});

	if (!userItems) {

		admonitions.showAdmonition(MESSAGE_STORAGE_GET_FAIL, "error");
		return;
		
	}

	if (!userItems.items || userItems.items.length === 0) {
		
		// print first table row as default if there is nothing to show
		table.createRow("", "");
		return;

	}

	for (item of userItems.items) {

		table.createRow(item.title, item.action);

	}

}


//entry point
//this is where javaScript start executing code

getUserDataFromStorage();

add_row_button.addEventListener("click", function(e) {
	
	table.createRow("","");

});

save_button.addEventListener("click", async function(e) {
	
	const userItems = table.getUserItems();

	if (userItems.error) {

		admonitions.showAdmonition(userItems.errorMessage, "error");
		return;

	}

	let success = await browser.runtime.sendMessage({action: "setData", payload: userItems});

	if (!success) {

		admonitions.showAdmonition(MESSAGE_STORAGE_SET_FAIL, "error");
		return;	

	}

	admonitions.showAdmonition(MESSAGE_SAVE_SUCCESS, "info");

	setTimeout(() => {
		admonitions.hideAdmonition();
	}, "2000")

	//load newly saved items from storage for user to show
	getUserDataFromStorage();

});

file_export.addEventListener("click", async function(e) {

	console.log("file export");

	let userItems = await browser.runtime.sendMessage({action: "getData"});

	const blob = file.create(userItems);


	//this could also be moved to background script
	const fileUrl = URL.createObjectURL(blob);

	//todo probably move it to downloadController in background script to override
	//the default return promise (make it return false upon fail, and id upon success)
	let downloading = await browser.downloads.download({
		url: fileUrl,
		filename: "items.json",
		saveAs: true
	});

	console.log(downloading);

	//and this also can be moved to background script
	browser.downloads.onChanged.addListener(function (e) {
		//revoke file url using downloads.onchanged
		console.log(e);
	});



});

file_import.addEventListener("change", async function(e) {

	const importedUserData =  await file.extractFromFile(e.target.files[0]);

	if (importedUserData.error) {

		admonitions.showAdmonition(importedUserData.errorMessage, "error");
		return;

	}

	let success = await browser.runtime.sendMessage({action: "setData", payload: importedUserData});

	if (!success) {

		admonitions.showAdmonition(MESSAGE_STORAGE_SET_FAIL, "error");
		return;	

	}

	admonitions.showAdmonition(MESSAGE_SAVE_SUCCESS, "info");

	setTimeout(() => {
		admonitions.hideAdmonition();
	}, "2000")

	//load newly saved items from storage for user to show
	getUserDataFromStorage();

});






