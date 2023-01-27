//upon failed reading from storage
function onError(error) {
  console.err(error);
}

//upon receiving context menu items from storage
function onReceivied(item) {

  //if the storage is empty, then return
  if(!item.items) {
    return;
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


//function that creates final URL that new tab should have. Returns undefined if term is invalid
function prepareUrl(link, term) {
  //check if provided term/selection is valid, return if not
  if (!validateSelection(term)) {
    return;
  }

  const defaultProtocol = "https://"; //protocol to append if link does not contain such
  let final = link;

  //if link does not contain any protocol, prepend one.
  //protocol in link is needed as otherwise it will be handled as local (for extension)
  if (!startsWithProtocol(final)) {
    final = defaultProtocol + final;
  }

  //if link does not contain wildcard, append term at the end
  if (final.search(/%s/gm) === -1) {
    return final + term;
  }

  //if wildcard does exist, replace it with term
  return final.replaceAll(/%s/gm, term);
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

      const term = info.selectionText; //get selected text. NOTE: this is assumed as context for menu items is hard coded
      const url = prepareUrl(contextMenuItem.action, term);

      //open new tab with prepared URL
      if (url) {
        browser.tabs.create({
            "url": url
        });
      }
    }
  }
});