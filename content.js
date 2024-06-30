document.addEventListener('mouseup', function() {
    var selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
        chrome.runtime.sendMessage({text: selectedText});
    }
});