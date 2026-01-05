const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");
const urlField = document.getElementById("url-field");

const itemManager = new ItemManager("");

async function getItem() {

	let params = new URLSearchParams(document.location.search);
	let id = params.get("item_id");

	if (!id) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;
	}

	item = await browser.runtime.sendMessage({action: "getItem", payload: id});
	itemManager.setItem(item);

	if (!itemManager.isGroup()) {
		
		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

}

async function addUrl() {

	if (!itemManager.isGroup()) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	urlField.setAttribute("required", "");

	if (!urlField.checkValidity()) {

		urlField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_URL,"error");
		return;

	}

	itemManager.addUrl(urlField.value);

	let success = await browser.runtime.sendMessage({action: "editItem", payload: itemManager.getItem()});

	if (success) {

		window.location.replace("editGroup.html?item_id="+itemManager.getId());
		return;
		
	}

	admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");

}

function cancel() {

	window.location.replace("editGroup.html?item_id="+itemManager.getId());

}

submitButton.onclick = addUrl;
cancelButton.onclick = cancel;

getItem();