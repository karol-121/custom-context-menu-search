async function getUserDataFromStorage() {

	let userItems = await browser.runtime.sendMessage({action: "getStorage"});

	table.resetTable();

	if (!userItems.items || userItems.items.length === 0) {
		
		// print first table row as default
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

	//todo: await set storage results, however currently it only does return undefined
	let a = await browser.runtime.sendMessage({action: "setStorage", payload: userItems});

	admonitions.showAdmonition(MESSAGE_SAVE_SUCCESS, "info");

	setTimeout(() => {
		admonitions.hideAdmonition();
	}, "2000")

	//load newly saved items from storage for user to show
	getUserDataFromStorage();

});






