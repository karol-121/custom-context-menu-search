async function getUserDataFromStorage() {

	table.resetTable();

	let userItems = await browser.runtime.sendMessage({action: "getData"});

	if (!userItems) {

		admonitions.showAdmonition(MESSAGE_STORAGE_GET_FAIL, "error");
		return;
		
	}

	if (!userItems.items || userItems.items.length === 0) {
		
		// print first table row as default if there is nothing to show
		table.createRow("", "","normal");
		return;

	}

	for (item of userItems.items) {

		table.createRow(item.title, item.action, item.type);

	}

}

function populateSuggestions(keyword) {

	suggestions.populate(getSearchItems(keyword, 5));

}


//entry point
//this is where javaScript start executing code

table.onRowSelectionUpdate = function(state) {
	remove_row_button.disabled = state;
	move_row_up_button.disabled = state;
	move_row_down_button.disabled = state;
}

getUserDataFromStorage();
populateSuggestions("");

suggestions.onSuggestionClicked = function(title) {

	const suggestedItem = getSearchItemByTitle(title);

	if (suggestedItem < 0) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	table.createRow(suggestedItem.title, suggestedItem.url);

}



add_row_button.addEventListener("click", function(e) {
	
	table.createRow("","","normal");

});

add_separator_button.addEventListener("click", function(e) {

	table.createRow("","","separator");

});

remove_row_button.addEventListener("click", function(e) {

	table.deleteRow(table.selected_row);

});

move_row_up_button.addEventListener("click", function(e) {

	table.moveRowUp(table.selected_row);

});

move_row_down_button.addEventListener("click", function(e) {

	table.moveRowDown(table.selected_row);

});

search_suggestions.addEventListener("input", function(e) {

	populateSuggestions(e.target.value);

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

	admonitions.showAdmonition(MESSAGE_SAVE_SUCCESS, "info", "2000");

	//load newly saved items from storage for user to show
	getUserDataFromStorage();

});

file_export.addEventListener("click", async function(e) {

	const userItems = await browser.runtime.sendMessage({action: "getData"});

	if (!userItems) {

		admonitions.showAdmonition(MESSAGE_STORAGE_GET_FAIL, "error");
		return;
		
	}

	const userItemsFile = file.createFromUserData(userItems);

	if (!userItemsFile) {

		admonitions.showAdmonition(MESSAGE_FAILED_FILE_CREATING, "error");
		return;

	}

	const exportConfig = {
		file: userItemsFile,
		name: "context_menu_items.json"
	}

	const exporting = await browser.runtime.sendMessage({action: "exportData", payload: exportConfig});

	if (!exporting) {
		
		admonitions.showAdmonition(MESSAGE_FAILED_FILE_DOWNLOAD, "error");
		return;

	}

	//"exportData" will return -1 if user cancels the download
	if (exporting === -1) {

		return;

	}

	admonitions.showAdmonition(MESSAGE_EXPORT_SUCCESS, "info");

	setTimeout(() => {
		admonitions.hideAdmonition();
	}, "2000");

});

file_import.addEventListener("change", async function(e) {

	const importedUserData =  await file.getUserData(e.target.files[0]);

	if (importedUserData.error) {

		admonitions.showAdmonition(importedUserData.errorMessage, "error");
		return;

	}

	const success = await browser.runtime.sendMessage({action: "setData", payload: importedUserData});

	if (!success) {

		admonitions.showAdmonition(MESSAGE_STORAGE_SET_FAIL, "error");
		return;	

	}

	admonitions.showAdmonition(MESSAGE_IMPORT_SUCCESS, "info");

	setTimeout(() => {
		admonitions.hideAdmonition();
	}, "2000")

	//load newly saved items from storage for user to show
	getUserDataFromStorage();

});






