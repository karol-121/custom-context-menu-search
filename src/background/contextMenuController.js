const contextMenuController = {

	contextMenuItems: [],

	setContextMenuItems(contextMenuItems) {
		
		browser.contextMenus.removeAll();
		this.contextMenuItems = [];

		for (contextMenuItem of contextMenuItems) {

			browser.contextMenus.create({
      	id: contextMenuItem.id,
      	title: contextMenuItem.title,
      	contexts: contextMenuItem.contexts,
    	});

    	this.contextMenuItems.push(contextMenuItem);

		}

	},

	getContextMenuItem(id) {

		for (contextMenuItem of this.contextMenuItems) {

			if (contextMenuItem.id === id) {

				return contextMenuItem;

			}

		}

		return undefined;

	}

}