document.addEventListener('DOMContentLoaded', function() {
  const openaiResult = document.getElementById('openaiResult');
  const userQuery = document.getElementById('userQuery');
  const submitQuery = document.getElementById('submitQuery');
  const chatContainer = document.getElementById('chatContainer');
  let conversationHistory = [];

  // Function to send request to OpenAI
  function sendRequest(query) {
      const openAIKey = ''; // Add the API key here
      const data = {
          messages: conversationHistory.concat([{ role: "user", content: query }]),
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
      .then(response => response.json())
      .then(data => {
          const responseText = data.choices[0].message.content;
          conversationHistory.push({ role: "user", content: query });
          conversationHistory.push({ role: "assistant", content: responseText });
          displayConversation();
      })
      .catch(error => {
          console.error('Error:', error);
          openaiResult.innerText = 'An error occurred. Please try again.';
      });
  }

  // Function to display the conversation
  function displayConversation() {
      chatContainer.innerHTML = '';
      conversationHistory.forEach(message => {
          const messageElement = document.createElement('div');
          messageElement.className = message.role === 'user' ? 'user-message' : 'assistant-message';
          messageElement.innerText = message.content;
          chatContainer.appendChild(messageElement);
      });
      chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Check for selected text on popup load
  chrome.storage.local.get('selectedText', (result) => {
    if (result.selectedText) {
      sendRequest(result.selectedText);
      chrome.storage.local.remove('selectedText');
    }
  });

  // Handle radio button change
  document.querySelectorAll('input[name="responseStyle"]').forEach(radio => {
      radio.addEventListener('change', function() {
          let query = '';
          switch (this.value) {
              case 'Shorter':
                  query = `Make this shorter: ${conversationHistory[conversationHistory.length - 1].content}`;
                  break;
              case 'Longer':
                  query = `Make this longer: ${conversationHistory[conversationHistory.length - 1].content}`;
                  break;
              case 'Simpler':
                  query = `Make this simpler: ${conversationHistory[conversationHistory.length - 1].content}`;
                  break;
              case 'More Casual':
                  query = `Make this more casual: ${conversationHistory[conversationHistory.length - 1].content}`;
                  break;
              case 'More Professional':
                  query = `Make this more professional: ${conversationHistory[conversationHistory.length - 1].content}`;
                  break;
              default:
                  query = `Explain this text in a simple way: ${conversationHistory[conversationHistory.length - 1].content}`;
          }
          sendRequest(query);
      });
  });

  // Handle user query submission
  submitQuery.addEventListener('click', function() {
      const query = userQuery.value;
      if (query) {
          sendRequest(query);
          userQuery.value = '';
      }
  });
});