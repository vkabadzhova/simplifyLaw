// background.js

// Add a listener to create the initial context menu items
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'selection',
    title: 'Explain with SimplifyLaw',
    contexts: ['selection']
  });
});


// Function to update the icon based on the presence of selectedText in local storage
function updateIcon() {
  chrome.storage.local.get('selectedText', function(result) {
    if (result.selectedText) {
      // Set the active icon
      chrome.action.setIcon({ path: 'images/128_SimplifyLaw_Active.png' });
    } else {
      // Set the default icon
      chrome.action.setIcon({ path: 'images/128_SimplifyLaw_Logo.png' });
    }
  });
}

chrome.contextMenus.onClicked.addListener((item, tab) => {
  if (item.menuItemId === 'selection') {
    chrome.storage.local.set({ selectedText: item.selectionText }, () => {
      console.log('selectedText is set to ' + item.selectionText);
      updateIcon();
    });
  }
});