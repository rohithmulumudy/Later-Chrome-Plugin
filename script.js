let tags = []
const colors = ['red', 'blue', 'green', 'gray', 'orange'];
let notes = "";
let manualTagCount = 0;

document.addEventListener('DOMContentLoaded', function() {

document.getElementById("apiButton").addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'saveNotes', data: document.getElementById("laterText").value, tags:tags})
});


setInterval(()=> {
    if(!(notes===document.getElementById("laterText").value)) {
        chrome.runtime.sendMessage({ action: 'generateTags', data: document.getElementById("laterText").value})
        notes = document.getElementById("laterText").value;
        document.getElementById('loadingMessage').style.display = 'block'
    }
}, 5000);


// function updateTag(ele) {
document.getElementById("exampleInput").addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        let ele = document.getElementById('exampleInput');
        // console.log(ele.value)
        tags.unshift(ele.value);
        if(manualTagCount <5) {
            manualTagCount++;
        }
        for(let i=0; i<Math.min(5, tags.length); i++) {
            document.getElementById(colors[i]).style.display = 'block';
            document.getElementById(colors[i]).textContent = tags[i];
        }
        tags = tags.slice(0,5);
        ele.value = ''        
    }
});

});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle the received content
    if(message.tags) {
        if(message.tags.length) {
            document.getElementById('loadingMessage').style.display = 'none'
            tags = tags.slice(0, manualTagCount);
            for(let i=0; i<Math.min(5-manualTagCount, message.tags.length); i++){
                tags.push(message.tags[i])
            }
            // tags = message.tags;
            for(let i=0; i<Math.min(5, tags.length); i++) {
                document.getElementById(colors[i]).style.display = 'block';
                document.getElementById(colors[i]).textContent = tags[i];
            }
        }
    }
        
    if(message.content){
        document.getElementById("laterText").value += message.content
    }

    if(message.success) {
        document.getElementById('savedMessage').style.display = 'block'
        setTimeout(() => {
            document.getElementById('savedMessage').style.display = 'none'
        }, 1000)
    }
});