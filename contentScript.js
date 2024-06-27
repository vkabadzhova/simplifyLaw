// contentScript.js
document.body.addEventListener('mouseup', () => {
  let selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    // Show "Explain" button next to the selected text
    // On button click, send selectedText to background.js
  }
});