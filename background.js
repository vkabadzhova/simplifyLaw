// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "simplifyText") {
      const openAIKey = 'sk-proj-K1PFkbkvxtmvGiEmQOg5T3BlbkFJml5kjk20CfcDa2mhMo7f'; // This should be securely stored
      const data = {
        prompt: `Explain in simple words: ${request.text}`,
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
  
      fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          ...data
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.choices && data.choices.length > 0) {
          const simplifiedText = data.choices[0].text.trim();
          sendResponse({ simplifiedText });
        } else {
          sendResponse({ error: "Failed to simplify the text." });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        sendResponse({ error: "An error occurred while simplifying the text." });
      });
  
      return true; // Indicates that the response is asynchronous
    }
  });