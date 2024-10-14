//context menu item that leads to options page
const options_page_shortcut = {
  id: generateNewId(),
  title: "Create new...",
  contexts: ["selection"],
  action: "%options%",
}

//upon failed reading from storage
function onError(error) {
  console.err(error);
}

//upon receiving context menu items from storage
function onReceivied(item) {

  //if no items are defined, add default one
  if(!item.items || item.items.length === 0) {

    const default_items = new Array();
    default_items.push(options_page_shortcut);

    item.items = default_items;
  }

  //remove all previously created context menu items
  browser.contextMenus.removeAll();

  //add context menu items from storage to array
  contextMenuItems = item.items;

  //register each context menu item
  for (const contextMenuItem of contextMenuItems) {

    browser.contextMenus.create({
      id: contextMenuItem.id,
      title: contextMenuItem.title,
      contexts: contextMenuItem.contexts,
    });

  }

}

//message respondent, update request from page.js is handled here
function respondToMessage(request, sender, response) {

  //if message contains a update request
  if(request.updated) {
    browser.storage.local.get().then(onReceivied, onError);
  }
  
}

//entry point
//this is where javaScript start executing code

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

      //if content menu item points to options page
      if (contextMenuItem.action === "%options%") {
        browser.runtime.openOptionsPage();
        return;
      }

      const selected_text = info.selectionText; //Assumed the context is text selection
      const url = composeURL(contextMenuItem.action, selected_text);

      //open new tab with composed URL
      if (url) {
        browser.tabs.create({
          "url": url
        });
      }
    }
  }
});