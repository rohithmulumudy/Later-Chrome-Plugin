// const websiteContent = document.documentElement.outerHTML;


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle the received content
    if(message.action == "getData") {
        chrome.runtime.sendMessage({ content: window.getSelection().toString() });
    }
});

setInterval(() => {
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput) {
    //   console.log(searchInput.value);
      chrome.runtime.sendMessage({ searchQuery: searchInput.value });
    }
}, 1000)


