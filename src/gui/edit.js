const form = document.getElementById("edit-item-form");
const titleField = document.getElementById("title-field");
const urlField = document.getElementById("url-field");
const cancelButton = document.getElementById("cancel-button");

let item;

async function getItem() {

	let params = new URLSearchParams(document.location.search);
	let id = params.get("item_id");

	if (!id) {
		// print error message
	}

	item = await browser.runtime.sendMessage({action: "getItem", payload: id});

	if (!item) {
		// print error message
	}

	titleField.value = item.title;
	urlField.value = item.action;

}

async function editItem() {

	// consider using html5 form input validation instead

	if (!item) {
		return;
	}

	item.title = titleField.value;
	item.action = urlField.value;

	let success = await browser.runtime.sendMessage({action: "editItem", payload: item});

}

function cancel() {

	window.location.replace("manage.html");

}

form.onsubmit = editItem;
cancelButton.onclick = cancel;

getItem();