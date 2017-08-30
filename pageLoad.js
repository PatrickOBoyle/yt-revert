//
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if(details.url.indexOf("youtube.com") !== -1 && details.url.indexOf("disable_polymer=true") === -1){
    if(details.url.indexOf("?") !== -1){
      chrome.tabs.update(details.tabId, {
        url: details.url + "&disable_polymer=true"
      });
    }else{
      chrome.tabs.update(details.tabId, {
        url: details.url + "?disable_polymer=true"
      });
    }
  }
});
