let downloadButton = document.getElementById('downloadButton');
let currentVideoData;

// when loaded get video URL
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: 'getVideoData' }, function (videoData) {
            currentVideoData = videoData;
            if (currentVideoData) {
                urlField.innerHTML = currentVideoData.title;
            }
        });
    });
});

// opens video in another tab
urlField.onclick = function () {
    chrome.tabs.create({ url: currentVideoData.url });
    return false;
}

// triggers download
downloadButton.onclick = function () {
    // send message to download video
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: 'downloadCurrentVideo' });
    });
};