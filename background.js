// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "simplifyText") {
      const openAIKey = ''; // Add the API key here
      const data = {
        messages: [
          // { role: "user", content: `Recognize the language of the original text I put here. Don't answer in English, if the text isn't in English, answer in the same language as the original text. Explain the text in a simple way: ${request.text}` }
          { role: "user", content: `Explain the text in a simple way: ${request.text}` }
        ],
        max_tokens: 300,
        model: "gpt-4",
      };
      
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('SimplifyLaw error: Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.choices && data.choices.length > 0 && data.choices[0].message.content.trim()) {
          const simplifiedText = data.choices[0].message.content.trim();
          sendResponse({ simplifiedText });
        } else {
          throw new Error('SimplifyLaw error: No choices found in the response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        sendResponse({ error: "SimplifyLaw error: An error occurred while calling the OpenAI API: " + error.message });
      });
      return true; // keeps the sendResponse callback valid after the listener returns
    }
});

// When you specify "type": "module" in the manifest background,
// you can include the service worker as an ES Module,
import { tldLocales } from './locales.js';

// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(async () => {
  for (const [tld, locale] of Object.entries(tldLocales)) {
    chrome.contextMenus.create({
      id: tld,
      title: locale,
      type: 'normal',
      contexts: ['selection']
    });
  }
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  const tld = item.menuItemId;
  chrome.storage.local.set({selectionText: item.selectionText}, function() {
    console.log('selectionText var is set to ' + value);
  });
});

// Add or removes the locale from context menu
// when the user checks or unchecks the locale in the popup
chrome.storage.onChanged.addListener(({ enabledTlds }) => {
  if (typeof enabledTlds === 'undefined') return;

  const allTlds = Object.keys(tldLocales);
  const currentTlds = new Set(enabledTlds.newValue);
  const oldTlds = new Set(enabledTlds.oldValue ?? allTlds);
  const changes = allTlds.map((tld) => ({
    tld,
    added: currentTlds.has(tld) && !oldTlds.has(tld),
    removed: !currentTlds.has(tld) && oldTlds.has(tld)
  }));

  for (const { tld, added, removed } of changes) {
    if (added) {
      chrome.contextMenus.create({
        id: tld,
        title: tldLocales[tld],
        type: 'normal',
        contexts: ['selection']
      });
    } else if (removed) {
      chrome.contextMenus.remove(tld);
    }
  }
});