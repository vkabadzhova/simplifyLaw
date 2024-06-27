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