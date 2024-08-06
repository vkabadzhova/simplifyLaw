document.addEventListener('DOMContentLoaded', function() {
    const openaiResult = document.getElementById('openaiResult');
    const userQuery = document.getElementById('userQuery');
    const submitQuery = document.getElementById('submitQuery');
    const stopResponse = document.getElementById('stopResponse');
    const chatContainer = document.getElementById('chatContainer');
    let conversationHistory = [];
    let stopFlag = false;
  
    // Add placeholder text only if there is no conversation history
    if (conversationHistory.length === 0) {
        chatContainer.innerText = 'Results will be displayed here...';
    }
  
    // Function to send request to OpenAI
    async function sendRequest(query) {
        const openAIKey = ''; // Add the API key here
        const data = {
            messages: conversationHistory.concat([{ role: "user", content: query }]),
            max_tokens: 300,
            model: "gpt-4o-mini",
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
                if (stopFlag) {
                    stopFlag = false;
                    break;
                }
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
  
    // Function to generate query based on selected radio button value
    function generateQuery(style, text) {
        switch (style) {
            case 'Shorter':
                return `Make this shorter: ${text}`;
            case 'Longer':
                return `Make this longer: ${text}`;
            case 'Simpler':
                return `Make this simpler: ${text}`;
            case 'More Casual':
                return `Make this more casual: ${text}`;
            case 'More Professional':
                return `Make this more professional: ${text}`;
            default:
                return `Explain this text in a simple way: ${text}`;
        }
    }
  
    // Check for selected text on popup load
    chrome.storage.local.get('selectedText', (result) => {
        if (result.selectedText) {
            // Remove placeholder text
            if (conversationHistory.length === 0) {
                chatContainer.innerText = '';
            }
  
            // Get the selected radio button value
            const selectedRadio = document.querySelector('input[name="responseStyle"]:checked');
            let query = result.selectedText;
            if (selectedRadio) {
                query = generateQuery(selectedRadio.value, result.selectedText);
            }
  
            sendRequest(query);
            chrome.storage.local.remove('selectedText');
            chrome.action.setIcon({ path: 'images/128_SimplifyLaw_Logo.png' });
        }
    });
  
    // Handle radio button change
    document.querySelectorAll('input[name="responseStyle"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const lastMessage = conversationHistory[conversationHistory.length - 1].content;
            const query = generateQuery(this.value, lastMessage);
            sendRequest(query);
        });
    });
  
    // Handle user query submission
    submitQuery.addEventListener('click', function() {
        const query = userQuery.value;
        if (query) {
            // Remove placeholder text
            if (conversationHistory.length === 0) {
                chatContainer.innerText = '';
            }
            sendRequest(query);
            userQuery.value = '';
        }
    });
  
    // Handle stop response button click
    stopResponse.addEventListener('click', function() {
        stopFlag = true;
    });
  
  });