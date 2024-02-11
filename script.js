async function saveData() {
    url = "https://api.restful-api.dev/objects"; // edit this line
    data = {"name": document.getElementById("laterText").value}; // edit this line
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    const resp = await response.json();
    console.log(resp)
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle the received content
    if(message.content){
        document.getElementById("laterText").value += message.content
    }
});