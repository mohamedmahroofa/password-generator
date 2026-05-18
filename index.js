const uppercaseChars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const lowercaseChars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolChars = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

// DOM Elements
const gen1 = document.getElementById("gen1");
const gen2 = document.getElementById("gen2");
const myButton = document.querySelector("#myButton");
const passwordLength = document.getElementById("passwordLength");
const lengthValue = document.getElementById("lengthValue");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const notification = document.getElementById("notification");
const copyButtons = document.querySelectorAll(".copy-btn");

// Update length display
passwordLength.addEventListener("input", () => {
  lengthValue.textContent = passwordLength.value;
});

// Generate password function
function generatePassword(
  length,
  useUppercase,
  useLowercase,
  useNumbers,
  useSymbols,
) {
  let availableChars = [];

  if (useUppercase) availableChars = availableChars.concat(uppercaseChars);
  if (useLowercase) availableChars = availableChars.concat(lowercaseChars);
  if (useNumbers) availableChars = availableChars.concat(numberChars);
  if (useSymbols) availableChars = availableChars.concat(symbolChars);

  // If no character type is selected, use all
  if (availableChars.length === 0) {
    availableChars = uppercaseChars.concat(
      lowercaseChars,
      numberChars,
      symbolChars,
    );
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
}

// Calculate password strength
function calculateStrength(password) {
  let strength = 0;
  const length = password.length;

  if (length >= 8) strength += 1;
  if (length >= 12) strength += 1;
  if (length >= 16) strength += 1;

  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  if (strength <= 2) return "weak";
  if (strength <= 4) return "medium";
  return "strong";
}

// Update strength indicator
function updateStrengthIndicator(password) {
  const strength = calculateStrength(password);
  const strengthTexts = {
    weak: "Weak - Consider adding more characters or symbols",
    medium: "Medium - Good, but could be stronger",
    strong: "Strong - Excellent password!",
  };

  strengthBar.className = `strength-bar ${strength}`;
  strengthText.className = `strength-text ${strength}`;
  strengthText.textContent = strengthTexts[strength];
}

// Main generate function
function generatePasswords() {
  const length = parseInt(passwordLength.value);
  const useUppercase = uppercaseCheckbox.checked;
  const useLowercase = lowercaseCheckbox.checked;
  const useNumbers = numbersCheckbox.checked;
  const useSymbols = symbolsCheckbox.checked;

  const password1 = generatePassword(
    length,
    useUppercase,
    useLowercase,
    useNumbers,
    useSymbols,
  );
  const password2 = generatePassword(
    length,
    useUppercase,
    useLowercase,
    useNumbers,
    useSymbols,
  );

  gen1.textContent = password1;
  gen2.textContent = password2;

  updateStrengthIndicator(password1);
}

// Event listener for generate button
myButton.addEventListener("click", generatePasswords);

// Copy to clipboard functionality
copyButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const targetId = btn.getAttribute("data-target");
    const passwordText = document.getElementById(targetId).textContent;

    try {
      await navigator.clipboard.writeText(passwordText);

      // Show notification
      notification.textContent = "✓ Password copied to clipboard!";
      notification.classList.add("show");

      // Change button appearance
      btn.classList.add("copied");
      btn.textContent = "✓ Copied";

      // Reset after 2 seconds
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.textContent = "📋 Copy";
        notification.classList.remove("show");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      notification.textContent = "✗ Failed to copy";
      notification.classList.add("show");
      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    }
  });
});

// Generate initial passwords on page load
window.addEventListener("load", generatePasswords);
