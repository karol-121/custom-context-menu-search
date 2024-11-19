//context menu item that leads to options page
const options_page_shortcut = {
  id: randomId.generateNewId(),
  title: "Create new...",
  contexts: ["selection"],
  action: "%options%",
}

async function setContextMenuItems() {

	let userContextMenuItems = await storageController.getStorage();

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

storageController.onStorageSet = setContextMenuItems;

browser.contextMenus.onClicked.addListener(onContextMenusClicked);

setContextMenuItems();