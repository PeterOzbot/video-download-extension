// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    // if message is for video url try to find the video and return
    if (msg.text === 'getVideoURL') {
        const videoSource = document.querySelector("video source");
        if (videoSource) {
            sendResponse(videoSource["src"]);
        }
        else {
            sendResponse(null);
        }
    }
});