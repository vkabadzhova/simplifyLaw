// background.js

// // Listen for installation event
// self.addEventListener('install', (event) => {
//   console.log('Service Worker installing.');
//   // Perform install steps
//   event.waitUntil(
//     caches.open('v1').then((cache) => {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/styles.css',
//         '/script.js',
//       ]);
//     })
//   );
// });

// // Listen for activation event
// self.addEventListener('activate', (event) => {
//   console.log('Service Worker activating.');
//   // Perform activation steps
//   event.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(keyList.map((key) => {
//         if (key !== 'v1') {
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
// });

// // Listen for fetch events
// self.addEventListener('fetch', (event) => {
//   console.log('Fetching:', event.request.url);
//   // Handle fetch events
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

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