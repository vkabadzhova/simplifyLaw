document.addEventListener('DOMContentLoaded', function() {
  const openaiResult = document.getElementById('openaiResult');
  const userQuery = document.getElementById('userQuery');
  const submitQuery = document.getElementById('submitQuery');
  let lastResponse = '';

  // Function to send request to OpenAI
  function sendRequest(query) {
      const openAIKey = ''; // Add the API key here
      const data = {
          messages: [{ role: "user", content: query }],
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
          openaiResult.innerText = responseText;
          lastResponse = responseText;
      })
      .catch(error => {
          console.error('Error:', error);
          openaiResult.innerText = 'An error occurred. Please try again.';
      });
  }

  // Handle radio button change
  document.querySelectorAll('input[name="responseStyle"]').forEach(radio => {
      radio.addEventListener('change', function() {
          let query = '';
          switch (this.value) {
              case 'Shorter':
                  query = `Make this shorter: ${lastResponse}`;
                  break;
              case 'Longer':
                  query = `Make this longer: ${lastResponse}`;
                  break;
              case 'Simpler':
                  query = `Make this simpler: ${lastResponse}`;
                  break;
              case 'More Casual':
                  query = `Make this more casual: ${lastResponse}`;
                  break;
              case 'More Professional':
                  query = `Make this more professional: ${lastResponse}`;
                  break;
              default:
                  query = `Explain the text in a simple way: ${lastResponse}`;
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