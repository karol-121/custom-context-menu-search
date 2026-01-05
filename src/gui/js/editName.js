const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");

const titleField = document.getElementById("title-field");

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

}


async function editName() {

	if (!itemManager.isItem()) {

		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;
		
	}

	//add required attribute after submiting to prevent :invalid pseudoclass being applied before user input
	titleField.setAttribute("required", "");

	if (!titleField.checkValidity()) {

		titleField.reportValidity();
		admonitions.showAdmonition(MESSAGE_INVALID_TITLE,"error");
		return;

	}

	itemManager.setTitle(titleField.value);

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

submitButton.onclick = editName;
cancelButton.onclick = cancel;

getItem();