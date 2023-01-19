//upon failed reading from storage
function onError(error) {
  console.log(error);
}

//upon receiving context menu items from storage
function onReceivied(item) {

  //add context menu items from storage to array
  contextMenuItems = item.items;

  //register each cotext menu item
  for (const contextMenuItem of contextMenuItems) {

    console.log(contextMenuItem);

    //TODO remove removed contextmenus upon update

    browser.contextMenus.create({
      id: contextMenuItem.id,
      title: contextMenuItem.title,
      contexts: contextMenuItem.contexts,
    });

  }

}

function respondToMessage(request, sender, response) {

  if(request.updated) {
    browser.storage.local.get().then(onReceivied, onError);
  }
  
}



//array with context menu items
let contextMenuItems;

//receivie context menu items from storage
browser.storage.local.get().then(onReceivied, onError);

browser.runtime.onMessage.addListener(respondToMessage);

//if context menu item has been clicked
browser.contextMenus.onClicked.addListener((info) => {
  
  //check which of registered context menu items has been pressed
  for (const contextMenuItem of contextMenuItems) {
    
    if(info.menuItemId === contextMenuItem.id) {
      //handle action using context menu's defined attributes

      //TODO: santize selection text
      const term = info.selectionText;

      //TODO: add support for wildcard (%s)
      const url = contextMenuItem.action + term;

      browser.tabs.create({
          "url": url
      });
    }
  }
});