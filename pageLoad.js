//
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log(details);
  console.log(details.url.indexOf("youtube.com"));
  console.log(details.url.indexOf('disable_polymer=true'));

  if(details.url.indexOf("youtube.com") !== -1 && details.url.indexOf("disable_polymer=true") === -1){
    console.log(1);

    console.log(details.url);

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
