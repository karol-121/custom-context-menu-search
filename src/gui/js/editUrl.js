const submitButton = document.getElementById("submit-button");
const deleteButton = document.getElementById("delete-button");
const cancelButton = document.getElementById("cancel-button");

const urlField = document.getElementById("url-field");

const itemManager = new ItemManager("");
let urlIndex;

async function getItem() {

	let params = new URLSearchParams(document.location.search);
	let id = params.get("item_id");
	let index = params.get("index");

	if (!id || !index) {

		admonitions.showAdmonition(MESSAGE_NO_ID, "error");
		return;

	}

	item = await browser.runtime.sendMessage({action: "getItem", payload: id});
	itemManager.setItem(item);

	if (!itemManager.isGroup()) {
		
		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;

	}

	urlIndex = index;
	urlField.value = itemManager.getUrl(urlIndex);

}



async function editUrl() {

	if (!itemManager.isGroup() || !urlIndex) {

		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;

	}

	urlField.setAttribute("required", "");

	if (!urlField.checkValidity()) {

		urlField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_URL,"error");
		return;

	}

	itemManager.editUrl(urlIndex, urlField.value);

	let success = await browser.runtime.sendMessage({action: "editItem", payload: itemManager.getItem()});

	if (success) {

		window.location.replace(`editGroup.html?item_id=${itemManager.getId()}`);
		return;
		
	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

async function deleteUrl() {

	if (!itemManager.isGroup() || !urlIndex) {

		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;

	}

	itemManager.deleteUrl(urlIndex);

	let success = await browser.runtime.sendMessage({action: "editItem", payload: itemManager.getItem()});

	if (success) {

		window.location.replace(`editGroup.html?item_id=${itemManager.getId()}`);
		return;
		
	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function cancel() {

	window.location.replace(`editGroup.html?item_id=${itemManager.getId()}`);

}

submitButton.onclick = editUrl;
deleteButton.onclick = deleteUrl;
cancelButton.onclick = cancel;

getItem();