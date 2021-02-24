chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {

    // only work on www.bitchute.com
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.bitchute.com', pathContains: "video" },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);

  });
});
