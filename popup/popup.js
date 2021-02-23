let downloadButton = document.getElementById('downloadButton');
let urlField = document.getElementById('urlField');

// when loaded get video URL
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: 'getVideoURL' }, function (url) {
            urlField.innerHTML = url;
            urlField.href = url;
        });
    });
});

downloadButton.onclick = function (element) {

    // download video when URL exists
    if (urlField.innerHTML && urlField.innerHTML != "undefined") {
        chrome.downloads.download({
            url: urlField.innerHTML
        });
    }
};