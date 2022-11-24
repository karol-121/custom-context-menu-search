//temponary examples of user defined new tab targets
const DuckDuckGoSearch = {
  id: "search-duckduckgo",
  title: "Search DuckDuckGo",
  contexts: ["selection"],
  action: "https://duckduckgo.com?q="
}

const DuckDuckGoTranslate = {
  id: "translate-duckduckgo",
  title: "Translate DuckDuckGo",
  contexts: ["selection"],
  action: "https://duckduckgo.com?q=translate "
}

const DuckDuckGoDefine = {
  id: "define-duckduckgo",
  title: "Define DuckDuckGo",
  contexts: ["selection"],
  action: "https://duckduckgo.com?q=define "
}

//add temponary examples to array, make them iterable
const contextMenuItems = [DuckDuckGoSearch, DuckDuckGoTranslate, DuckDuckGoDefine];


//register context menu item for each temponary example
for (const contextMenuItem of contextMenuItems) {

  browser.contextMenus.create({
    id: contextMenuItem.id,
    title: contextMenuItem.title,
    contexts: contextMenuItem.contexts,
  });

}

//if context menu item has been clicked
browser.contextMenus.onClicked.addListener((info) => {
  
  //check which of registered context menu items has been pressed
  for (const contextMenuItem of contextMenuItems) {
    
    if(info.menuItemId === contextMenuItem.id) {
      //handle action using context menu's defined attributes

      //TODO: santize selection text
      const term = info.selectionText;

      const url = contextMenuItem.action + term;

      browser.tabs.create({
          "url": url
      });
    }
  }
});