// document.addEventListener('DOMContentLoaded', function() {
//     const mainText = "Чл. 10. (1) Всяко лице, упълномощено да регулира движението по пътищата, наричано по нататък \"регулировчик\", носи задължителни отличителни знаци, по които участниците в движението лесно да го разпознават и добре да го виждат както през деня, така и през нощта. Той може да ползва регулировъчна палка и полицейска свирка, а когато регулира движението при строително-ремонтни работи на пътя - червен флаг.(2) Сигнали на регулировчика са следните положения на тялото и ръцете му:1. дясна ръка, вдигната вертикално - означава \"ВНИМАНИЕ, СПРИ!\"; това не се отнася за онези водачи, които в момента на подаването на този сигнал, след като им е било разрешено преминаването, са толкова близо до регулировчика, че не могат да спрат, без да създадат опасност за движението; при подаване на този сигнал на кръстовище участниците в движението, които са навлезли в кръстовището, трябва да го освободят;2. ръка или ръце, протегнати хоризонтално встрани - след като е направил този жест, регулировчикът може да свали ръката или ръцете си. Сигналът означава:а) \"ПРЕМИНАВАНЕТО Е РАЗРЕШЕНО\" за водачите, които се намират срещу лявото или дясното рамо на регулировчика и ще преминат направо или ще завият надясно, както и за пешеходците, които искат да преминат пред гърдите или зад гърба на регулировчика;б) \"ПРЕМИНАВАНЕТО Е ЗАБРАНЕНО\" за всички останали участници в движението;3. дясна ръка, протегната хоризонтално напред, означава:а) \"ПРЕМИНАВАНЕТО Е РАЗРЕШЕНО\" за водачите на пътни превозни средства, които се намират срещу лявото рамо на регулировчика, и за пешеходците, които искат да преминат зад гърба му;б) \"ПРЕМИНАВАНЕТО Е ЗАБРАНЕНО\" за всички останали участници в движението.(3) Освен сигналите, посочени в ал. 2, регулировчикът може да използва и допълнителни разбираеми жестове за даване на други указания и разпореждания на участниците в движението."; // This should be dynamically fetched or defined
//     const promptText = "Explain in simple words: " + mainText;
//     chrome.runtime.sendMessage({action: "simplifyText", text: promptText}, function(response) {
//         const resultElement = document.getElementById('openaiResult'); // Assuming the class overview is used for results
//         if (response.error) {
//             resultElement.textContent = 'Error: ' + response.error;
//         } else {
//             resultElement.textContent = response.simplifiedText;
//         }
//     });
// });

// ----------------- Below is when it was working -----------------
// - backend errors:
// --> Error handling response: ReferenceError: document is not defined at chrome-extension://dfjcffodpajiagmkcglkheelcejlhojf/background.js:71:29
// --> Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
// - yet overall looks good 

// --> There is no 'explainButton' in the popup.html file. Maybe this is why the first error is thrown.
// document.getElementById('explainButton').addEventListener('click', function() {
//     const selectedText = window.getSelection().toString();
//     if (selectedText) {
//         sendQueryToOpenAI(selectedText);
//     } else {
//         alert('Please select some text to explain.');
//     }
// });

// function sendQueryToOpenAI(selectedText) {
    // const openAIKey = 'sk-proj-K1PFkbkvxtmvGiEmQOg5T3BlbkFJml5kjk20CfcDa2mhMo7f'; // This should be securely stored
    //   const data = {
    //     messages: [
    //       { role: "user", content: `Explain in simple words: ${selectedText}` }
    //     ],
    //     max_tokens: 60,
    //     model: "gpt-4",
    //   };
      
    //   fetch('https://api.openai.com/v1/chat/completions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${openAIKey}`
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('ReadmeLaw error: Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     if (data.choices && data.choices.length > 0 && data.choices[0].message.content.trim()) {
    //       const simplifiedText = data.choices[0].message.content.trim();
    //       sendResponse({ simplifiedText });
    //     } else {
    //       throw new Error('ReadmeLaw error: No choices found in the response');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     sendResponse({ error: "ReadmeLaw error: An error occurred while calling the OpenAI API: " + error.message });
    //   });
    //   return true; // keeps the sendResponse callback valid after the listener returns
    // }
// }