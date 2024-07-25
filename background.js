// background.js

// Add a listener to create the initial context menu items
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'selection',
    title: 'Explain with SimplifyLaw',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  if (item.menuItemId === 'selection') {
    chrome.storage.local.set({ selectedText: item.selectionText }, () => {
      console.log('selectedText is set to ' + item.selectionText);
    });
  }
});