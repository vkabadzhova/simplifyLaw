document.addEventListener('DOMContentLoaded', function() {
  const openaiResult = document.getElementById('openaiResult');
  const userQuery = document.getElementById('userQuery');
  const submitQuery = document.getElementById('submitQuery');
  const chatContainer = document.getElementById('chatContainer');
  let conversationHistory = [];

  // Add placeholder text
  chatContainer.innerText = 'Results will be displayed here...';

  // Function to send request to OpenAI
  async function sendRequest(query) {
      const openAIKey = ''; // Add the API key here
      const data = {
          messages: conversationHistory.concat([{ role: "user", content: query }]),
          max_tokens: 300,
          model: "gpt-4",
          stream: true
      };

      // Print user's prompt immediately
      conversationHistory.push({ role: "user", content: query });
      displayConversation();

      try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${openAIKey}`
              },
              body: JSON.stringify(data)
          });

          const reader = response.body.getReader();
          let responseText = '';
          const decoder = new TextDecoder();

          // Add a placeholder for the assistant's response
          conversationHistory.push({ role: "assistant", content: '' });
          displayConversation();

          while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value);
              const lines = chunk.split('\n').filter(line => line.trim() !== '');
              for (const line of lines) {
                  const message = line.replace(/^data: /, '');
                  if (message === '[DONE]') {
                      break;
                  }
                  try {
                      const parsed = JSON.parse(message);
                      const content = parsed.choices[0].delta.content;
                      if (content) {
                          responseText += content;
                          // Update the last assistant message
                          conversationHistory[conversationHistory.length - 1].content = responseText;
                          displayConversation();
                      }
                  } catch (error) {
                      console.error('Error parsing message:', message, error);
                  }
              }
          }

          // Final update to the assistant's message
          conversationHistory[conversationHistory.length - 1].content = responseText;
          displayConversation();
      } catch (error) {
          console.error('Error:', error);
          openaiResult.innerText = 'An error occurred. Please try again.';
      }
  }

  // Function to display the conversation
  function displayConversation() {
      chatContainer.innerHTML = '';
      conversationHistory.forEach(message => {
          const messageElement = document.createElement('div');
          const labelElement = document.createElement('div');
          if (message.role === 'user') {
              labelElement.className = 'user-label';
              labelElement.innerText = 'You';
              messageElement.className = 'user-message';
              messageElement.style.textAlign = 'right';
          } else {
              labelElement.className = 'assistant-label';
              labelElement.innerText = 'SimplifyLaw Chatbot';
              messageElement.className = 'assistant-message';
              messageElement.style.textAlign = 'left';
          }
          messageElement.innerText = message.content;
          chatContainer.appendChild(labelElement);
          chatContainer.appendChild(messageElement);
      });
      chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Check for selected text on popup load
  chrome.storage.local.get('selectedText', (result) => {
    if (result.selectedText) {
      // Remove placeholder text
      chatContainer.innerText = '';
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
          // Remove placeholder text
          chatContainer.innerText = '';
          sendRequest(query);
          userQuery.value = '';
      }
  });
});