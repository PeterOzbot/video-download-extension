// when extension is installed
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {

    // only work on www.bitchute.com/video
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.bitchute.com', pathContains: "video" },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);

  });
});

// listen for messages from other parts of extension
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  // download video
  if (msg.text === 'downloadVideo') {

    // download video when URL exists
    const videoData = msg.videoData;
    if (videoData.url && videoData.title) {
      chrome.downloads.download({
        url: videoData.url,
        filename: videoData.title.replace(/[^a-zA-Z ]+/g, '') + '.mp4'
      });
    }
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // when status is complete then add download action
  if (changeInfo.status && changeInfo.status == "complete") {
    chrome.tabs.sendMessage(tabId, {
      text: 'addDownloadAction'
    })
  }  
});