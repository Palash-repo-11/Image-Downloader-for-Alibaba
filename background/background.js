
chrome.runtime.onInstalled.addListener((id, previousversion, reason) => {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { chrome.tabs.sendMessage(tabs[0].id, { msg: "start" }); });

})

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.sendMessage(activeInfo.tabId, { msg: "start" })
})

chrome.tabs.onUpdated.addListener((tabId, changedInfo, tab) => {
    // if (changedInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, { msg: "start" })
    // }
})



chrome.runtime.onInstalled.addListener((details) => {
    installedNotification(details.reason)
    if (details.reason === "install") {
        var installedTime = new Date().getTime();
        var userId = generateUserId();
        chrome.storage.local.set({ installedTime, userId });
    }
})

const installedNotification = (msg) => {
    chrome.notifications.create(
        "noti",
        {
            type: "basic",
            iconUrl: chrome.runtime.getURL("icon.png"),
            title: "Image Downloader for AliExpress Alibaba™",
            message: `${msg} successfully`,
        })
}
const generateUserId = () => {
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var userId = "";
    for (var i = 0; i < 10; i++) {
        userId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return userId;
}