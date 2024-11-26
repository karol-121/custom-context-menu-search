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

file_export.addEventListener("click", function(e) {

	console.log("file export");

});

file_import.addEventListener("change", async function(e) {


	const data =  await file.extractFromFile(e.target.files[0]);

	if (data.error) {

		admonitions.showAdmonition(data.errorMessage, "error");
		return;

	}

	admonitions.hideAdmonition(); //for now to reset

	//const success = await browser.runtime.sendMessage({action: "setData"});

	//if !success 

	//admonitions.show("error", something went wrong)
	//return


	//getUserDataFromStorage();







});






