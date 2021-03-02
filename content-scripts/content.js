// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    // try to get video data and return
    if (msg.text === Message_GetVideoData) {

        // return
        sendResponse(getVideoData());
    }

    // download video
    if (msg.text === Message_DownloadCurrentVideo) {

        // get video data
        const videoData = getVideoData();

        // trigger download
        chrome.runtime.sendMessage({ text: Message_DownloadVideo, videoData });
    }

    // add download action
    if (msg.text === Message_AddDownloadAction) {
        tryAddDownloadAction();
    }
});

// parses page to get video info
function getVideoData() {
    // get source
    const videoSourceEl = document.querySelector("video source");
    const videoSource = videoSourceEl ? videoSourceEl["src"] : '';

    // get title
    const videoTitleEl = document.querySelector('#video-title');
    const videoTitle = videoTitleEl ? videoTitleEl.innerHTML : '';

    // return
    return { url: videoSource, title: videoTitle };
}

function tryAddDownloadAction() {
    // get actions container
    const actionListContainer = document.querySelector('.action-list');
    if (actionListContainer) {
        fetch(chrome.extension.getURL('/video-download-action/video-download-action.html'))
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
                    chrome.runtime.sendMessage({ text: Message_DownloadVideo, videoData });
                });

                //downloadAction.tooltip({container:'body',trigger:'hover'});
                $('#videoDownloadAction').tooltip({ container: 'body', trigger: 'hover' });


            }).catch(err => {
                console.log(err);
            });
    }
}