const contextMenuController = {

	menuItems: [],

	setContextMenuItems(newMenuItems) {
		
		browser.contextMenus.removeAll();
		this.menuItems = [];

		for (menuItem of newMenuItems) {

			browser.contextMenus.create({
      	id: menuItem.id,
      	title: menuItem.title,
      	contexts: menuItem.contexts,
    	});

    	this.menuItems.push(menuItem);

		}

	},

	getContextMenuItem(id) {

		for (menuItem of this.menuItems) {

			if (menuItem.id === id) {

				return menuItem;

			}

		}

		return undefined;

	}

}