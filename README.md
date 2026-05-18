# Password Generator

A simple yet polished password generator web app built with HTML, CSS, and JavaScript.

## Project Overview

This project generates two random secure passwords at once, with options to customize the password length and choose which character types to include. It also includes a password strength indicator and copy-to-clipboard buttons for easy use.

## Features

- Generate two passwords simultaneously
- Password length slider (minimum 8, maximum 40)
- Toggle character type inclusion:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Symbols
- Password strength indicator (Weak / Medium / Strong)
- Copy to clipboard for each generated password
- Responsive layout for mobile and desktop
- Styled dark theme with modern controls and visual feedback

## Files

- `index.html` - app structure and UI markup
- `style.css` - app styling and responsive layout
- `index.js` - password generation logic, UI interaction, clipboard behavior

## How to Use

1. Open `index.html` in a browser.
2. Use the length slider to choose a password size between 8 and 40 characters.
3. Toggle the character type checkboxes to include or exclude uppercase letters, lowercase letters, numbers, and symbols.
4. Click **Generate passwords** to create two secure passwords.
5. Click the **Copy** button next to a password to copy it to the clipboard.

## Notes

- If no character type is selected, the app automatically falls back to using all available character sets.
- Password strength is calculated based on length and character variety.

## Improvements and Ideas

- Add a password visibility or “show password” toggle.
- Add a single password input field for copy-to-clipboard while keeping two results.
- Add an option to only generate one password or more than two.
- Add accessibility improvements like ARIA descriptions and keyboard focus styling.

## License

This project is open and free to use for learning or portfolio purposes.
