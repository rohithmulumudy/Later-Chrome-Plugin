chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'openSidePanel',
      title: 'Save For Later',
      contexts: ['all']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'openSidePanel') {
        chrome.sidePanel.open({ tabId: tab.id });
        chrome.sidePanel.setOptions({
            tabId: tab.id,
            path: 'index.html',
            enabled: true
          });
      }
});


chrome.commands.onCommand.addListener(command => {
    if (command === "run_script") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "getData"}, function(response) {});  
        });
    }
});

