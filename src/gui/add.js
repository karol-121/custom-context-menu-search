const form = document.getElementById("new-item-form");
const titleField = document.getElementById("title-field");
const urlField = document.getElementById("url-field");
const cancelButton = document.getElementById("cancel-button");

async function addItem(e) {

	e.preventDefault();

	const item = new contextMenuItem(titleField.value, urlField.value, "normal");

	let success = await browser.runtime.sendMessage({action: "addItem", payload: item});

	if (success) {

		window.location.replace("manage.html");
		return;
		
	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function cancel() {

	window.location.replace("manage.html");

}

form.onsubmit = addItem;
cancelButton.onclick = cancel;