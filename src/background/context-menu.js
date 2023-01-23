//upon failed reading from storage
function onError(error) {
  console.log(error);
}

//upon receiving context menu items from storage
function onReceivied(item) {

  //if the storage is empty, then return
  if(!item.items) {
    return;
  }

  //remove all created contextmenu items
  browser.contextMenus.removeAll();

  //add context menu items from storage to array
  contextMenuItems = item.items;

  //register each cotext menu item
  for (const contextMenuItem of contextMenuItems) {

    browser.contextMenus.create({
      id: contextMenuItem.id,
      title: contextMenuItem.title,
      contexts: contextMenuItem.contexts,
    });

  }

}

//message responder, update request comes here from page.js via messages
function respondToMessage(request, sender, response) {

  //if message contains a upate request
  if(request.updated) {
    browser.storage.local.get().then(onReceivied, onError);
  }
  
}


//entry point

//array with context menu items
let contextMenuItems = [];

//get saved context menu items from storage
browser.storage.local.get().then(onReceivied, onError);

//register listener to message event
browser.runtime.onMessage.addListener(respondToMessage);

//if context menu item has been clicked
browser.contextMenus.onClicked.addListener((info) => {
  
  //check which of registered context menu items has been pressed
  for (const contextMenuItem of contextMenuItems) {
    
    if(info.menuItemId === contextMenuItem.id) {
      //handle action using context menu's defined attributes

      //TODO: santize selection text
      //TODO: select suitable origin ("linkText", "selectionText") of term value
      const term = info.selectionText;

      //TODO: add support for wildcard (%s)
      //TODO: append https:// to link if missing
      const url = contextMenuItem.action + term;

      browser.tabs.create({
          "url": url
      });
    }
  }
});