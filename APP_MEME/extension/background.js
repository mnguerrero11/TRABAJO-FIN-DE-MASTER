chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyzeMeme",
    title: "Analyze Meme",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyzeMeme") {
    chrome.storage.local.set({ imageUrl: info.srcUrl }, () => {
      chrome.action.openPopup();
    });
  }
});
