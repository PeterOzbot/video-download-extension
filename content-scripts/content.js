// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    // try to get video data and return
    if (msg.text === 'getVideoData') {
        // get source
        const videoSourceEl = document.querySelector("video source");
        const videoSource = videoSourceEl ? videoSourceEl["src"] : '';

        // get title
        const videoTitleEl = document.querySelector('#video-title');
        const videoTitle = videoTitleEl ? videoTitleEl.innerHTML : '';

        // return
        sendResponse({ url: videoSource, title: videoTitle });
    }
});