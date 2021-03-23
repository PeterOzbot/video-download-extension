// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    // try to get video data and return
    if (msg.text === Messages.GetVideoData) {

        // return
        sendResponse(getVideoData());
    }

    // download video
    if (msg.text === Messages.DownloadCurrentVideo) {

        // get video data
        const videoData = getVideoData();

        // trigger download
        chrome.runtime.sendMessage({ text: Messages.DownloadVideo, videoData });
    }

    // add download action
    if (msg.text === Messages.AddDownloadAction) {
        tryAddDownloadAction();
    }
});

// parses page to get video info
function getVideoData() {
    // get source
    const videoSourceEl = document.querySelector(BITCHUTE.VIDEO_SELECTOR);
    const videoSource = videoSourceEl ? videoSourceEl["src"] : '';

    // get title
    const videoTitleEl = document.querySelector(BITCHUTE.VIDEO_TITLE_SELECTOR);
    const videoTitle = videoTitleEl ? videoTitleEl.innerHTML : '';

    // return
    return { url: videoSource, title: videoTitle };
}

function tryAddDownloadAction() {
    // get actions container
    const actionListContainer = document.querySelector(BITCHUTE.ACTIONS_SELECTOR);
    if (actionListContainer) {
        fetch(chrome.extension.getURL('/content-bitchute/video-download-action/video-download-action.html'))
            .then(response => response.text())
            .then(data => {
                // create action
                var downloadAction = $(data)[0];

                // add to page
                actionListContainer.insertBefore(downloadAction, actionListContainer.firstChild);

                // listen to click
                downloadAction.addEventListener("click", function () {

                    // get video data
                    const videoData = getVideoData();

                    // trigger download
                    chrome.runtime.sendMessage({ text: Messages.DownloadVideo, videoData });
                });

                // add tooltip
                $('#videoDownloadAction').tooltip({ container: 'body', trigger: 'hover' });
            }).catch(err => {
                console.log(err);
            });
    }
}