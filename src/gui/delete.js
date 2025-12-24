const deleteButton = document.getElementById("delete-button");
const cancelButton = document.getElementById("cancel-button");

let id;

async function getItem() {

	let params = new URLSearchParams(document.location.search);
	
	id = params.get("item_id");

	if (!id) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
	}

}

async function deleteItem() {

	if (!id) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
		
	}

	let success = await browser.runtime.sendMessage({action: "deleteItem", payload: id});

	if (success) {

		window.location.replace("manage.html");
		return;

	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function cancel() {

	window.location.replace("manage.html");

}

deleteButton.onclick = deleteItem;
cancelButton.onclick = cancel;

getItem();