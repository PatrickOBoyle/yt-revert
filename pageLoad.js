// listen for new tabs
chrome.tabs.onCreated.addListener(function (tabId , info) {
  // info may be undefined when tab created
  if(typeof(info) != "undefined" && typeof(info.url) != "undefined"){
    url = info.url;

    if(isYouTubeUrl(url) && doesUrlNotContainField(url)){
      revertYT(tabId);
    }
  }
});

// listen for updated tabs
chrome.tabs.onUpdated.addListener(function (tabId , info) {
  // not all tab updates contain the URL (such as title, or status complete)
  if(typeof(info) != "undefined" && typeof(info.url) != "undefined"){
    url = info.url;

    if(isYouTubeUrl(url) && doesUrlNotContainField(url)){
      revertYT(tabId);
    }
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
