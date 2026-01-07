let userContextMenuItems;

async function setContextMenuItems() {

	userContextMenuItems = await storageController.getData();

	//as storageController.getData returns "false" upon failing
	//convert this return value to an object so the default context menu item can be added
	if (!userContextMenuItems) {

		userContextMenuItems = {};

	}

	//if no data from storage -> create shortcut as default
	if (!userContextMenuItems.items || userContextMenuItems.items.length === 0) {

		let defaultItem = new ContextMenuItem("Create new...", "%options%");
		userContextMenuItems.items = [defaultItem.export()];

	}

	contextMenuController.setContextMenuItems(userContextMenuItems.items);

}

function openMultiple(actions, text) {

	for (action of actions) {

		let url = composeURL(action, text);

		if (!url) {

			continue;
		}

		tabController.setTab(url, true);

	}

}

function openSingle(action, text, discarded) {

	let url = composeURL(action, text);

	if (!url) {

		return;

	}

	tabController.setTab(url, discarded);

}

function onContextMenusClicked(info) {

	let clickedMenuItem = contextMenuController.getContextMenuItem(info.menuItemId);

	if (!clickedMenuItem) {

		return;

	}

	if (clickedMenuItem.actions) {

		openMultiple(clickedMenuItem.actions, info.selectionText)
		return;

	}


	if (clickedMenuItem.action === "%all%") {

		for (item of userContextMenuItems.items) {

			if (item.action) {

				openSingle(item.action, info.selectionText, true)
				
			}

		}

		return;

	}

	if (clickedMenuItem.action === "%all_all%") {

		for (item of userContextMenuItems.items) {

			if (item.action) {

				openSingle(item.action, info.selectionText, true);
				
			}

			if (item.actions) {

				openMultiple(item.actions, info.selectionText);

			}

		}

		return;

	}

	if (clickedMenuItem.action === "%options%") {

		tabController.setOptionsPage();
		return;

	}

	openSingle(clickedMenuItem.action, info.selectionText, false);

}

function respondToMessage(request, sender, response) {

	if (request.action === "getData") {

    return storageController.getData();

  }

  if (request.action === "setData") {

  	return storageController.setData(request.payload);

  }

	if (request.action === "exportData") {

		return downloadController.downloadFile(request.payload.file, request.payload.name);

	}

	if (request.action === "getItem") {

		return dataController.getItem(request.payload);
		
	}

	if (request.action === "addItem") {

		return dataController.addItem(request.payload);
		
	}

	if (request.action === "editItem") {

		return dataController.editItem(request.payload);
		
	}

	if (request.action === "deleteItem") {

		return dataController.deleteItem(request.payload);

	}

	if (request.action === "moveItemUp") {

		return dataController.moveItemUp(request.payload);

	}

	if (request.action === "moveItemDown") {

		return dataController.moveItemDown(request.payload);

	}

  
}

//storage.onchanged does not work for some reason (probably because of way the storage is set)
//therefore use custom created event callback
storageController.onStorageChanged = setContextMenuItems;

browser.contextMenus.onClicked.addListener(onContextMenusClicked);

browser.runtime.onMessage.addListener(respondToMessage);

setContextMenuItems();