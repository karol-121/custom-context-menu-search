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

function editItem(item) {
	// wrap function so item_id is parameter
	let id = item.target.item_id;
	window.location.replace("edit.html?item_id="+id,);
}

function deleteItem(item) {
	// wrap function so item_id is parameter
	console.log(item.target.item_id);
}


table.onEditButton = editItem;
table.onDeleteButton = deleteItem;
getUserDataFromStorage();


