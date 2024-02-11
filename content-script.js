// const websiteContent = document.documentElement.outerHTML;


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle the received content
    if(message.action == "getData") {
        chrome.runtime.sendMessage({ content: window.getSelection().toString() });
    }
});

