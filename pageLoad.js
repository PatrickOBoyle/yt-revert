//
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log(details);

  if(detectYTURL(details.url) && details.url.indexOf("disable_polymer=true") === -1){
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

function detectYTURL(url){
  return (url.indexOf("www.youtube.com") !== -1 && url.indexOf("/js") === -1);
}
