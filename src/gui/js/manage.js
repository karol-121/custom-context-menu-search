const fileExportButton = document.getElementById("file-export");
const	fileImportButton = document.getElementById("file-import");
const addSeparatorButton = document.getElementById("add-separator-button");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const upButton = document.getElementById("up-button");
const downButton = document.getElementById("down-button");
const searchSuggestionsButton = document.getElementById("search-suggestions");

async function getUserDataFromStorage() {

	list.resetList();

	let userItems = await browser.runtime.sendMessage({action: "getData"});

	if (!userItems) {

		admonitions.showAdmonition(MESSAGE_STORAGE_GET_FAIL, "error");
		return;
		
	}

	if (!userItems.items || userItems.items.length === 0) {
		
		list.printEmpty();
		return;

	}

	for (item of userItems.items) {

		list.createListItem(item);

	}

}

async function addSeparator() {

	let separator = new contextMenuItem("", "", "separator");

	let success = await browser.runtime.sendMessage({action: "addItem", payload: separator});

	if (!success) {
		
		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	} 

	list.createListItem(separator);

}

function addItem() {

	window.location.replace("add.html");
	
}

async function editItem() {

	let id = list.getSelectionId();

	if (id < 0) {
		
		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
		
	}

	let item = await browser.runtime.sendMessage({action: "getItem", payload: id});

	if (!item) {

		return;

	}

	if (item.type === "separator") {

		window.location.replace("delete.html?item_id="+id);
			
	}

	if (item.type === "normal") {

		window.location.replace("edit.html?item_id="+id);

	}
	
}

async function addPresetItem(title) {

	const suggestedItem = getSearchItemByTitle(title);

	if (suggestedItem < 0) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	const item = new contextMenuItem(suggestedItem.title, suggestedItem.url, "normal");

	let success = await browser.runtime.sendMessage({action: "addItem", payload: item});

	if (!success) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	list.createListItem(item);

}

async function moveItemUp() {

	let id = list.getSelectionId();

	if (id < 0) {
		
		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	let success = await browser.runtime.sendMessage({action: "moveItemUp", payload: id});

	if (!success) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	list.moveSelectedUp();

}

async function moveItemDown() {

	let id = list.getSelectionId();

	if (id < 0) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	let success = await browser.runtime.sendMessage({action: "moveItemDown", payload: id});

	if (!success) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	list.moveSelectedDown();

}

async function exportToFile() {

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

}

async function importFromFile(e) {

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

}

function populateSuggestions(keyword) {

	suggestions.populate(getSearchItems(keyword, 5));

}

function searchSuggestions(e) {

	populateSuggestions(e.target.value);

}

function disableButtons() {

	if (list.getSelectionId() < 0) {

		editButton.setAttribute("disabled","");
		upButton.setAttribute("disabled","");
		downButton.setAttribute("disabled","");
		return;

	}

	editButton.removeAttribute("disabled");
	upButton.removeAttribute("disabled");
	downButton.removeAttribute("disabled");

}



suggestions.onSuggestionClicked = addPresetItem;

addButton.onclick = addItem;
addSeparatorButton.onclick = addSeparator;
editButton.onclick = editItem;
upButton.onclick = moveItemUp;
downButton.onclick = moveItemDown;

list.onSelection = disableButtons;

fileExportButton.onclick = exportToFile;
fileImportButton.onchange = importFromFile;
searchSuggestionsButton.oninput = searchSuggestions;


getUserDataFromStorage();
populateSuggestions("");
disableButtons();


