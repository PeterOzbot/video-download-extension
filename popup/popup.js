let downloadButton = document.getElementById('downloadButton');
let urlField = document.getElementById('urlField');

// when loaded get video URL
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: 'getVideoData' }, function (videoData) {
            if (videoData) {
                urlField.innerHTML = videoData.title;
                urlField.href = videoData.url;
            }
        });
    });
});

downloadButton.onclick = function (element) {

    // download video when URL exists
    if (urlField.href && urlField.innerHTML) {
        chrome.downloads.download({
            url: urlField.href,
            filename: urlField.innerHTML.replace(/[^a-zA-Z]+/g, '')
        });
    }
};