const form = document.getElementById("new-item-form");
const titleField = document.getElementById("title-field");
const urlField = document.getElementById("url-field");
const cancelButton = document.getElementById("cancel-button");

async function addItem() {

	const item = new contextMenuItem(titleField.value, urlField.value, "normal");

	let success = await browser.runtime.sendMessage({action: "addItem", payload: item});

}

function cancel() {

	window.location.replace("manage.html");

}

form.onsubmit = addItem;
cancelButton.onclick = cancel;