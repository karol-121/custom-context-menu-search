const titleField = document.getElementById("title-field");
const urlField = document.getElementById("url-field");
const submitButton = document.getElementById("submit-button");
const deleteButton = document.getElementById("delete-button");
const cancelButton = document.getElementById("cancel-button");

let item;

async function getItem() {

	let params = new URLSearchParams(document.location.search);
	let id = params.get("item_id");

	if (!id) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
	}

	item = await browser.runtime.sendMessage({action: "getItem", payload: id});

	if (!item) {
		
		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	titleField.value = item.title;
	urlField.value = item.action;

}

async function editItem(e) {

	e.preventDefault();

	if (!item) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
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

	item.title = titleField.value;
	item.action = urlField.value;

	let success = await browser.runtime.sendMessage({action: "editItem", payload: item});

	if (success) {

		window.location.replace("manage.html");
		return;

	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

async function deleteItem(e) {

	e.preventDefault();

	if (!item) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
		
	}

	let success = await browser.runtime.sendMessage({action: "deleteItem", payload: item.id});

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

submitButton.onclick = editItem;
deleteButton.onclick = deleteItem;
cancelButton.onclick = cancel;

getItem();