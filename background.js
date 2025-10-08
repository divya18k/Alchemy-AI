chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "rewrite-with-ai",
    title: "Rewrite with On-Device AI",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "rewrite-with-ai" && info.selectionText) {
    chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      if (chrome.action.openPopup) {
        chrome.action.openPopup();
      } else {
        console.log("Please click the extension icon to see the rewritten text.");
      }
    });
  }
});