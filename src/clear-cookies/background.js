chrome.action.onClicked.addListener(async (tab) => {

    const currentUrl = new URL(tab.url);
    const currentDomain = currentUrl.hostname;
    const currentProtocol = currentUrl.protocol;

    chrome.cookies.getAll({ domain: currentDomain }, (cookies) => {
        for (const cookie of cookies) {
            const cookieDomain = cookie.domain.startsWith('.') ?
                cookie.domain.slice(1) : cookie.domain;
            const cookieUrl = `${currentProtocol}//${cookieDomain}${cookie.path}`;

            chrome.cookies.remove({
                url: cookieUrl,
                name: cookie.name
            });
        }
    });
});
