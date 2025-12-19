async function getUserDataFromStorage() {

	table.resetTable();

	let userItems = await browser.runtime.sendMessage({action: "getData"});

	if (!userItems) {

		// admonitions.showAdmonition(MESSAGE_STORAGE_GET_FAIL, "error");
		return;
		
	}

	if (!userItems.items || userItems.items.length === 0) {
		
		//todo: show "no items" message to the user
		return;

	}

	for (item of userItems.items) {

		table.createRow(item.id, item.title, item.action, item.type);

	}

}

async function deleteItem(id) {

	let success = await browser.runtime.sendMessage({action: "deleteItem", payload: id});

	if (!success) {

		// todo: show information to the user
		return;

	}

	getUserDataFromStorage();

}

function onEditItem(item) {
	// wrap function so item_id is parameter
	let id = item.target.item_id;
	window.location.replace("edit.html?item_id="+id,);
}

function onDeleteItem(item) {
	// wrap function so item_id is parameter
	deleteItem(item.target.item_id);
}


table.onEditButton = onEditItem;
table.onDeleteButton = onDeleteItem;
getUserDataFromStorage();


