const titleField = document.getElementById("title-field");
const urlField = document.getElementById("url-field");
const addUrlButton = document.getElementById("add-url-button");
const editUrlButton = document.getElementById("edit-url-button");
const deleteUrlButton = document.getElementById("delete-url-button");
const submitButton = document.getElementById("submit-button");
const deleteButton = document.getElementById("delete-button");
const cancelButton = document.getElementById("cancel-button");

async function getGroupItem() {

	let params = new URLSearchParams(document.location.search);
	let id = params.get("item_id");

	if (!id) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
	}

	let item = await browser.runtime.sendMessage({action: "getItem", payload: id});

	if (!item && !item.actions) {
		
		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	
	itemGroupController.groupItem = item;
	updateFields();

}

function updateFields() {

	titleField.value = itemGroupController.groupItem.title;

	list.resetList();

	for (let i = 0; i < itemGroupController.groupItem.actions.length; i++) {

		list.urlListItem(i, itemGroupController.groupItem.actions[i]);

	}

}

async function editItem(e) {

	e.preventDefault();

	if (!itemGroupController.groupItem) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
		
	}

	//add required attribute after submiting to prevent :invalid pseudoclass being applied before user input
	titleField.setAttribute("required", "");

	if (!titleField.checkValidity()) {

		titleField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_TITLE,"error");
		return;

	}

	itemGroupController.groupItem.title = titleField.value;

	let success = await browser.runtime.sendMessage({action: "editItem", payload: itemGroupController.groupItem});

	if (success) {

		window.location.replace("manage.html");
		return;

	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

async function deleteItem(e) {

	e.preventDefault();

	if (!itemGroupController.groupItem) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
		
	}

	let success = await browser.runtime.sendMessage({action: "deleteItem", payload: itemGroupController.groupItem.id});

	if (success) {

		window.location.replace("manage.html");
		return;

	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function cancel(e) {

	e.preventDefault();
	window.location.replace("manage.html");

}

function addUrl() {

	let url = urlField.value;

	itemGroupController.addUrl(url);
	updateFields();

}

function chooseUrl() {
	let selected = list.getSelectionId();

	if (selected < 0) {

		urlField.value = "";
		return;

	}

	let url = itemGroupController.groupItem.actions[selected];
	urlField.value = url;

}

function editUrl() {

	let url = urlField.value;

	let selected = list.getSelectionId();

	if (selected < 0) {
		return;
	}

	itemGroupController.editUrl(selected, url);
	updateFields();

}

function deleteUrl() {

	let selected = list.getSelectionId();

	if (selected < 0) {
		return;
	}

	itemGroupController.deleteUrl(selected);
	updateFields();
}

submitButton.onclick = editItem;
deleteButton.onclick = deleteItem;
cancelButton.onclick = cancel;

list.onSelection = chooseUrl;

addUrlButton.onclick = addUrl;
editUrlButton.onclick = editUrl;
deleteUrlButton.onclick = deleteUrl;

getGroupItem();