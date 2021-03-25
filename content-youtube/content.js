// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    // add download action
    if (msg.text === Messages.AddDownloadAction) {
        tryAddDownloadAction();
    }
});


function tryAddDownloadAction() {
    // get actions container
    const actionListContainer = document.querySelector(YOUTUBE.ACTIONS_SELECTOR);
    if (actionListContainer) {
        fetch(chrome.extension.getURL('content-youtube/video-download-action/video-download-action.html'))
            .then(response => response.text())
            .then(data => {
                // create action
                var downloadAction = $(data)[0];

                // add to page
                actionListContainer.insertBefore(downloadAction, actionListContainer.childNodes[2]);

                // listen to click
                downloadAction.addEventListener("click", function () {

                    // trigger download
                    downloadVideo();
                });

                // add tooltip
                $('#videoDownloadAction').tooltip({ container: 'body', trigger: 'hover' });
            }).catch(err => { 
                console.log(err);
            });
    }
}

function downloadVideo() {
    alert(location.href);
}