// // JavaScript code for handling text selection and displaying the "Explain" button
// document.addEventListener('mouseup', function(e) {
//     let selectedText = window.getSelection().toString().trim();
//     if (selectedText.length > 0) {
//         // Code to create and display the "Explain" button
//     }
// });

// // Code to handle "Explain" button click and send query to OpenAI

// JavaScript code for handling text selection and displaying the "Explain" button
document.addEventListener('mouseup', function(e) {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        let explainButton = document.getElementById('explain-btn');
        if (!explainButton) {
            explainButton = document.createElement('button');
            console.log("Explain button is created!")
            console.log(explainButton)
            explainButton.id = 'explain-btn';
            explainButton.textContent = 'Explain';
            document.body.appendChild(explainButton);
        }

        // // Position the button near the selection
        // const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        // explainButton.style.left = `${rect.left + window.scrollX}px`;
        // explainButton.style.top = `${rect.bottom + window.scrollY + 10}px`; // 10px below the selection
        // explainButton.style.display = 'block';

        const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        // Calculate left position to ensure it doesn't go off-screen
        let left = rect.left + scrollX + (rect.width / 2) - (explainButton.offsetWidth / 2); // Center the button under the selection
        // Prevent button from going off-screen on the left
        left = Math.max(left, 0); 
        // Prevent button from going off-screen on the right
        left = Math.min(left, window.innerWidth - explainButton.offsetWidth);

        // Calculate top position with a small offset below the selection
        let top = rect.bottom + scrollY + 10; // 10px below the selection
        // Prevent button from going off-screen at the bottom
        top = Math.min(top, window.innerHeight - explainButton.offsetHeight + scrollY);

        explainButton.style.left = `${left}px`;
        explainButton.style.top = `${top}px`;
        explainButton.style.display = 'block';
    }
});

document.addEventListener('click', function(e) {
    const explainButton = document.getElementById('explain-btn');
    if (explainButton && e.target !== explainButton) {
        explainButton.style.display = 'none';
    }
});

// Handle "Explain" button click and send query to OpenAI
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'explain-btn') {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            const query = `Explain in simple words: ${selectedText}`;
            // Placeholder for sending query to OpenAI
            console.log(query); // Replace this with the actual OpenAI API call

            // Example of how you might send a query to OpenAI
            // This is a placeholder and will not work without setting up an API call with your API key
            /*
            fetch('https://api.openai.com/v4/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: query,
                    temperature: 0.7,
                    max_tokens: 150,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0
                })
            })
            .then(response => response.json())
            .then(data => console.log(data.choices[0].text))
            .catch(error => console.error('Error:', error));
            */
        }
    }
});