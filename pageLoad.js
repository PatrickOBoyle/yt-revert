// listen for new tabs
chrome.tabs.onCreated.addListener(function (tabId , info) {
  if(isYouTubeUrl(info.url) && doesUrlNotContainField(info.url)){
    revertYT(tabId);
  }
});

// listen for updated tabs
chrome.tabs.onUpdated.addListener(function (tabId , info) {
  // check
  if(isYouTubeUrl(info.url) && doesUrlNotContainField(info.url)){
    revertYT(tabId);
  }
});

// enable old version
function revertYT(tabId){
  chrome.tabs.get(tabId, function(tab){
      if(tab.url.indexOf("?") !== -1){
        chrome.tabs.update(tabId, {
          url: tab.url + "&disable_polymer=true"
        });
      }else{
        chrome.tabs.update(tabId, {
          url: tab.url + "?disable_polymer=true"
        });
      }
  });
}

function doesUrlNotContainField(url){
  return url.indexOf("disable_polymer=true") === -1;
}

function isYouTubeUrl(url){
  return (url.indexOf("www.youtube.com") !== -1 || url.indexOf("https://youtube.com") !== -1);
}
