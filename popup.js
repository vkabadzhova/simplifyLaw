// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if (request.action === "updateOpenAIResult") {
    const resultElement = document.getElementById('openaiResult');
    if (request.error) {
        resultElement.textContent = 'Error: ' + request.error;
    } else {
        resultElement.textContent = request.simplifiedText;
    }
}
});

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['selectionText'], function(result) {
    chrome.runtime.sendMessage({action: "simplifyText", text: result.selectionText}, function(response) {
      const resultElement = document.getElementById('openaiResult'); // Assuming the class overview is used for results
      if (response.error) {
          resultElement.textContent = 'Error: ' + response.error;
      } else {
        resultElement.textContent = response.simplifiedText;
      }
    });
  });

  // chrome.storage.local.remove(['selectionText'], function() {
  //   console.log('selectionText var is removed');
  // });
});