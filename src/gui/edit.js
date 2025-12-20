const form = document.getElementById("edit-item-form");
const titleField = document.getElementById("title-field");
const urlField = document.getElementById("url-field");
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

	// consider using html5 form input validation instead
	e.preventDefault();

	if (!item) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
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

function cancel() {

	window.location.replace("manage.html");

}

form.onsubmit = editItem;
cancelButton.onclick = cancel;

getItem();