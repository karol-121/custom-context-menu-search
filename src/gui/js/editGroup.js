const pageTitle = document.getElementById("title");

const addUrlButton = document.getElementById("add-button");
const editUrlButton = document.getElementById("edit-button");
const moveUrlUpButton = document.getElementById("move-up-button");
const moveUrlDownButton = document.getElementById("move-down-button");
const editNameButton = document.getElementById("edit-name-button");

const deleteButton = document.getElementById("delete-button");
const cancelButton = document.getElementById("cancel-button");

const itemManager = new ItemManager("");

async function getGroup() {

	let params = new URLSearchParams(document.location.search);
	let id = params.get("item_id");

	if (!id) {

		admonitions.showAdmonition(MESSAGE_NO_ID, "error");
		return;

	}

	let group = await browser.runtime.sendMessage({action: "getItem", payload: id});
	itemManager.setItem(group);

	if (!itemManager.isGroup()) {
		
		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;

	}

	pageTitle.innerText = `Manage group - "${itemManager.getTitle()}"`;
	list.resetList();

	if (itemManager.isUrlsEmpty()) {

		list.printEmpty();
		return;

	}

	for (url of itemManager.getUrls()) {

		list.printUrl(url);

	}

}


async function deleteGroup() {

	if (!itemManager.isGroup()) {

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

function addUrl() {

	if (!itemManager.isGroup()) {

		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;

	}

	window.location.replace(`addUrl.html?item_id=${itemManager.getId()}`);

}

function editUrl() {

	let index = list.getSelectionIndex();

	if (index < 0) {
		
		admonitions.showAdmonition(MESSAGE_NO_ID, "error");
		return;

	}

	window.location.replace(`editUrl.html?item_id=${itemManager.getId()}&index=${index}`);

}

async function moveUrlUp() {

	let index = list.getSelectionIndex();

	if (index < 0) {
		
		admonitions.showAdmonition(MESSAGE_NO_ID, "error");
		return;

	}

	itemManager.moveUrlUp(index);

	let success = await browser.runtime.sendMessage({action: "editItem", payload: itemManager.getItem()});

	if (!success) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	list.moveSelectedUp();


}

async function moveUrlDown() {

	let index = list.getSelectionIndex();

	if (index < 0) {
		
		admonitions.showAdmonition(MESSAGE_NO_ID, "error");
		return;

	}

	itemManager.moveUrlDown(index);

	let success = await browser.runtime.sendMessage({action: "editItem", payload: itemManager.getItem()});

	if (!success) {

		admonitions.showAdmonition(MESSAGE_DEFAULT_ERROR, "error");
		return;

	}

	list.moveSelectedDown();

}

function editName() {

	if (!itemManager.isGroup()) {

		admonitions.showAdmonition(MESSAGE_INVALID_ITEM, "error");
		return;
		
	}

	window.location.replace(`editName.html?item_id=${itemManager.getId()}`);
	
}

function disableButtons() {

	if (list.getSelectionIndex() < 0) {

		editUrlButton.setAttribute("disabled","");
		moveUrlUpButton.setAttribute("disabled","");
		moveUrlDownButton.setAttribute("disabled","");
		return;

	}

	editUrlButton.removeAttribute("disabled");
	moveUrlUpButton.removeAttribute("disabled");
	moveUrlDownButton.removeAttribute("disabled");

}

deleteButton.onclick = deleteGroup;
cancelButton.onclick = cancel;

list.onSelection = disableButtons;

addUrlButton.onclick = addUrl;
editUrlButton.onclick = editUrl;
moveUrlUpButton.onclick = moveUrlUp;
moveUrlDownButton.onclick = moveUrlDown;
editNameButton.onclick = editName;

getGroup();