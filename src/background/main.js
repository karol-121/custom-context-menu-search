//default context menu item
const options_page_shortcut = {
  id: randomId.generateNewId(),
  title: "Create new...",
  contexts: ["selection"],
  action: "%options%",
}

async function setContextMenuItems() {

	let userContextMenuItems = await storageController.getData();

	//as storageController.getData returns "false" upon failing
	//convert this return value to an object so the default context menu item can be added
	if (!userContextMenuItems) {

		userContextMenuItems = {};

	}

	//if no data from storage -> add default
	if (!userContextMenuItems.items || userContextMenuItems.items.length === 0) {

		userContextMenuItems.items = [options_page_shortcut];

	}

	contextMenuController.setContextMenuItems(userContextMenuItems.items);

}

function onContextMenusClicked(info) {

	let contextMenuItem = contextMenuController.getContextMenuItem(info.menuItemId);

	if (!contextMenuItem) {

		return;

	}

	if (contextMenuItem.action === "%options%") {

		tabController.setOptionsPage();
		return;

	}

	let url = composeURL(contextMenuItem.action, info.selectionText)

	if (!url) {

		return;

	}

	tabController.setTab(url)

}

function respondToMessage(request, sender, response) {

	if (request.action === "getData") {

    return storageController.getData();

  }

  if (request.action === "setData") {

  	return storageController.setData(request.payload);

  }

  
}

//storage.onchanged does not work for some reason (probably because of way the storage is set)
//therefore use custom created event callback
storageController.onStorageChanged = setContextMenuItems;

browser.contextMenus.onClicked.addListener(onContextMenusClicked);

browser.runtime.onMessage.addListener(respondToMessage);

setContextMenuItems();