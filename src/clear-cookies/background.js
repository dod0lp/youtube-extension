chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.url.startsWith('http')) {
        console.log('Invalid URL protocol:', tab.url);
        return;
    }

    const currentUrl = new URL(tab.url);
    const currentDomain = currentUrl.hostname;

    if (/(^|\.)google\./.test(currentDomain)) {
        console.log('Blocked domain:', currentDomain);
        return;
    }
    if (/(^|\.)youtube\./.test(currentDomain)) {
        console.log('Blocked domain:', currentDomain);
        return;
    }

  chrome.cookies.getAll({domain: currentDomain}, (cookies) => {
    console.log(cookies.length);
    
    for (const cookie of cookies) {
      let urlToClear = `${url.protocol}//${cookie.domain.replace(/^\./, '')}${cookie.path}`;
      console.log(urlToClear);
      console.log("fafd");

      chrome.cookies.remove({
        url: urlToClear,
        name: cookie.name,
        storeId: cookie.storeId
      });
    }

    console.log("Reloading");
    chrome.tabs.reload(tab.id);
  });
});