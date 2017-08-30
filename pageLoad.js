// listen for page navigations, detect if they're YT & include our disable
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if(detectYTURL(details.url) && details.url.indexOf("disable_polymer=true") === -1){
    // append the disabling field
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

// helper to keep things clean 👍
function detectYTURL(url){
  return ((url.indexOf("www.youtube.com") !== -1 || url.indexOf("https://youtube.com") !== -1)
          && url.indexOf("/js") === -1);
}
