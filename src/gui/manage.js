const fileExportButton = document.getElementById("file_export");
const	fileImportButton = document.getElementById("file_import");
const addSeparatorButton = document.getElementById("add-separator-button");
const addButton = document.getElementById("add-button");

async function getUserDataFromStorage() {

	table.resetTable();

	let userItems = await browser.runtime.sendMessage({action: "getData"});

	if (!userItems) {

		// admonitions.showAdmonition(MESSAGE_STORAGE_GET_FAIL, "error");
		return;
		
	}

	if (!userItems.items || userItems.items.length === 0) {
		
		//todo: show "no items" message to the user
		return;

	}

	for (item of userItems.items) {

		table.createRow(item.id, item.title, item.action, item.type);

	}

}

async function addSeparator() {

	let separator = new contextMenuItem("", "", "separator");

	let success = await browser.runtime.sendMessage({action: "addItem", payload: separator});

	if (!success) {
		// notify about failure
	} 

	getUserDataFromStorage();

}

function addItem() {

	window.location.replace("add.html");
	
}

function editItem(item) {
	// wrap function so item_id is parameter
	let id = item.target.item_id;
	window.location.replace("edit.html?item_id="+id,);

}

async function deleteItem(item) {
	// wrap function so item_id is parameter

	let success = await browser.runtime.sendMessage({action: "deleteItem", payload: item.target.item_id});

	if (!success) {

		// todo: show information to the user
		return;

	}

	getUserDataFromStorage();

}

async function moveItemUp(item) {

	let success = await browser.runtime.sendMessage({action: "moveItemUp", payload: item.target.item_id});

	if (!success) {

		// todo: show information to the user
		return;

	}

	getUserDataFromStorage();

}

async function moveItemDown(item) {

	let success = await browser.runtime.sendMessage({action: "moveItemDown", payload: item.target.item_id});

	if (!success) {

		// todo: show information to the user
		return;

	}

	getUserDataFromStorage();

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


table.onEditButton = editItem;
table.onDeleteButton = deleteItem;
table.onMoveUpButton = moveItemUp;
table.onMoveDownButton = moveItemDown;

addButton.onclick = addItem;
addSeparatorButton.onclick = addSeparator;
fileExportButton.onclick = exportToFile;
fileImportButton.onchange = importFromFile;


getUserDataFromStorage();


