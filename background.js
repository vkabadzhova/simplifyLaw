// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "simplifyText") {
      const openAIKey = 'sk-proj-K1PFkbkvxtmvGiEmQOg5T3BlbkFJml5kjk20CfcDa2mhMo7f'; // This should be securely stored
      const data = {
        messages: [
          { role: "user", content: `Explain in simple words: ${request.text}` }
        ],
        max_tokens: 60,
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
          throw new Error('ReadmeLaw error: Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.choices && data.choices.length > 0 && data.choices[0].message.content.trim()) {
          const simplifiedText = data.choices[0].message.content.trim();
          sendResponse({ simplifiedText });
        } else {
          throw new Error('ReadmeLaw error: No choices found in the response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        sendResponse({ error: "ReadmeLaw error: An error occurred while calling the OpenAI API: " + error.message });
      });
      return true; // keeps the sendResponse callback valid after the listener returns
    }
});

  // Copyright 2017 The Chromium Authors. All rights reserved.
  // Use of this source code is governed by a BSD-style license that can be
  // found in the LICENSE file.

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

  // Open a new search tab when the user clicks a context menu
  chrome.contextMenus.onClicked.addListener((item, tab) => {
    const tld = item.menuItemId;
    // const url = new URL(`https://google.${tld}/search`);
    // url.searchParams.set('q', item.selectionText);
    // chrome.tabs.create({ url: url.href, index: tab.index + 1 });
    chrome.runtime.sendMessage({action: "simplifyText", text: item.selectionText}, function(response) {
      const resultElement = document.getElementById('openaiResult'); // Assuming the class overview is used for results
      if (response.error) {
          resultElement.textContent = 'Error: ' + response.error;
      } else {
          resultElement.textContent = response.simplifiedText;
      }
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