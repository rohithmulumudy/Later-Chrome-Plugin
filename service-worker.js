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


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle the received content
    if(message.action == "generateTags") {
        url = "https://later-ai-backend.onrender.com/getTags"; // edit this line
        data={"query": message.data};
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(resp => resp.json())
            .then(tags => {
                // console.log(tags);
                tags.sort((a,b) => b.score - a.score)
                chrome.runtime.sendMessage({tags: tags.map(obj => obj["word"])});
            });
    }

    if(message.action == "saveNotes") {
        url = "https://later-ai-backend.onrender.com/saveNotes"; // edit this line
        data={"data": message.data, "tags": message.tags};
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(resp => resp.json())
            .then(resp => {
                // console.log(tags);
                // tags.sort((a,b) => b.score - a.score)
                chrome.runtime.sendMessage({success: true});
            });
    }
});
    