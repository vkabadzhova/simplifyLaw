# SimplifyLaw Browser Extension

![Marquee](https://github.com/vkabadzhova/simplifyLaw/blob/main/images/Marquee_simplifylaw.png)

✨ Welcome to SimplifyLaw! ✨

> _**Feel free to contact me**_ for any questions related to the project, including those questions you think are "stupid" (such as "how do I run that?"). It is pretty tricky; I am so grateful you're even here reading this, so I'll be _more than happy to help_:)

> *Disclaimer: SimplifyLaw is intended as an informational tool only, and does not constitute legal advice. Always consult with an attorney for advice regarding your specific situation.

## Description

SimplifyLaw is a browser extension designed to make legal jargon more accessible. It helps users understand the law by directly explaining legal terms and phrases in their browser. Whether you're reading a legal document online or just curious about the T&C of your favourite website, SimplifyLaw offers a convenient way to get instant clarifications.

## Installation
> _**Comming soon:**_ The extension will soon be available in the Chrome Extensions Store:)

<!-- ### From the Web Store

1. Visit the SimplifyLaw extension page on the Chrome Web Store or Firefox Add-ons site.
2. Click "Add to Chrome" or "Add to Firefox" to install the extension.
3. Once installed, the SimplifyLaw icon will appear in your browser's toolbar. -->

### Manual Installation (Developer Mode)
> _**Note:**_ You will need an OpenAI API key. You can pay and use your own, or contact me through some of the contacts below to give you a test key:)  

1. Clone the repository or download the ZIP file of the project.
   ```bash
   git clone https://github.com/vkabadzhova/readme-law-simplifier
   ```
   OR download from the green button
1. Extract the ZIP file (if downloaded) to a preferred location on your computer.
1. Open the `popup.js` file and paste your OpenAI API key in the `sendRequest` function:
   ```js
   const openAIKey = ''; // Add the API key here
   ```

3. Open your browser and navigate to the extensions page:
   - Chrome: `chrome://extensions/`
   - Firefox: `about:addons`
4. Enable "Developer mode" (Chrome) or "Debug Add-ons" (Firefox).
5. Click "Load Unpacked" (Chrome) or "Load Temporary Add-on" (Firefox) and select the project folder where the `manifest.json` file is located.
6. The SimplifyLaw extension should now be installed in your browser --> try it out on some webpage!
7. Pin it on your toolbar for quick and easy access;)

## How to Use
- Select a text from any browser (Terms and Conditions page, PDF opened in the browser, patent page, etc.)
- Click on the right button, then "Explain with SimplifyLaw". The extensions icon will change its color to remind you to click on it:)
- Go the SimplifyLaw extension's popup (an "S" icon) - pin the icon in the toolbar for quick access in the future!
- Check out the result!

More features!
- Adjust the level of explanation (simpler, shorter, longer, more casual, more professional, etc.)
- Ask any follow-up questions!! 

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, feel free to fork the repository and submit a pull request. Please ensure your code adheres to the project's coding standards and include any relevant documentation or tests.

## License

SimplifyLaw is licensed under the MIT License. See the LICENSE file for more details.

## Contact
- GitHub 
- X --> [@KabVioleta44703](https://x.com/KabVioleta44703)
- LinkedIn --> [Violeta Kabadzhova](https://www.linkedin.com/in/violeta-kabadzhova/)
- email: vkabadzhova [at] gmail.com
