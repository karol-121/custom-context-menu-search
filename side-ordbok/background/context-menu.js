browser.contextMenus.create({
  id: "open-selected-in-dictionary",
  title: "Search Ordbokene.no",
  contexts: ["selection"]
});


browser.contextMenus.onClicked.addListener((info, tab) => {
  if(info.menuItemId === "open-selected-in-dictionary") {

    //TODO: santize selection text
    const term = info.selectionText

    //TODO: redo url form string to location object with params
    const url = "https://ordbokene.no/bm/search?q="+term+"&scope=ei";

    //if selection text should open in sidebar, use tutorial form here: https://github.com/mdn/webextensions-examples/blob/master/context-menu-copy-link-with-types/clipboard-helper.js
    //basicly here an content script has to execute that should create an action that sidebar can listen and catch to
    //for example add a param to current url while sidebar script listen to changes in url 

    browser.tabs.create({
        "url": url
    });


  }
});