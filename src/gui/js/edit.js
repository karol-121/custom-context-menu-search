const titleField = document.getElementById("title-field");
const urlField = document.getElementById("url-field");
const submitButton = document.getElementById("submit-button");
const deleteButton = document.getElementById("delete-button");
const cancelButton = document.getElementById("cancel-button");

const itemManager = new ItemManager("");

async function getItem() {

	let params = new URLSearchParams(document.location.search);
	let id = params.get("item_id");

	if (!id) {

		admonitions.showAdmonition(MESSAGE_NO_ID, "error");
		return;
		
	}

	item = await browser.runtime.sendMessage({action: "getItem", payload: id});
	itemManager.setItem(item);

	if (!itemManager.isItem()) {
		
		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;

	}

	titleField.value = itemManager.getTitle();
	urlField.value = itemManager.getAction();

}

async function editItem() {

	if (!itemManager.isItem()) {

		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;
		
	}

	//add required attribute after submiting to prevent :invalid pseudoclass being applied before user input
	titleField.setAttribute("required", "");
	urlField.setAttribute("required", "");

	if (!titleField.checkValidity()) {

		titleField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_TITLE,"error");
		return;

	}

	if (!urlField.checkValidity()) {

		urlField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_URL,"error");
		return;

	}

	itemManager.setTitle(titleField.value);
	itemManager.setAction(urlField.value);

	let success = await browser.runtime.sendMessage({action: "editItem", payload: itemManager.getItem()});

	if (success) {

		window.location.replace("manage.html");
		return;

	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

async function deleteItem() {

	if (!itemManager.isItem()) {

		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;
		
	}

	let success = await browser.runtime.sendMessage({action: "deleteItem", payload: itemManager.getId()});

	if (success) {

		window.location.replace("manage.html");
		return;

	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function cancel() {

	window.location.replace("manage.html");

}

submitButton.onclick = editItem;
deleteButton.onclick = deleteItem;
cancelButton.onclick = cancel;

getItem();