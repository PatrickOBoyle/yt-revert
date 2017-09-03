// When the field is set on a video, a brief reload is made removing the
// field from the URL but keeping the reverted setting. This set holds
// these urls before they are reset.
videoUrlSet = new Set();

// listen for new tabs
chrome.tabs.onCreated.addListener(function (tabId , info) {
  // info may be undefined when tab created

  if(typeof(info) != "undefined" && typeof(info.url) != "undefined"){
    url = info.url;

    if(isYouTubeUrl(url) && doesUrlNotContainField(url) && !videoUrlSet.has(tabId)){
      revertYT(tabId);
    }

    if(info.status === "complete"){
      videoUrlSet.delete(tabId);
    }
  }
});

// listen for updated tabs
chrome.tabs.onUpdated.addListener(function (tabId , info, tab) {
  if(info.status === "complete"){
    // wait until next reqeust has passed, then clear the set
    setTimeout(function(){
      videoUrlSet.clear();
    }, 2000);

  }

  // not all tab updates contain the URL (such as title, or status complete)
  if(typeof(info) != "undefined" && typeof(info.url) != "undefined"){
    url = info.url;

    if(isYouTubeUrl(url) && doesUrlNotContainField(url) && !videoUrlSet.has(tab.url)){
      revertYT(tabId);
    }
  }
});

// enable old version
function revertYT(tabId){
  chrome.tabs.get(tabId, function(tab){
      videoUrlSet.add(tab.url);

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
