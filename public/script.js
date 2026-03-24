function clk() {
    const name = document.querySelector('.name').value.trim().toLowerCase();
    const password = document.querySelector('.password').value;
    const loader = document.getElementById('loader');
    const whyDiv = document.querySelector('.why');
    const suggestionDiv = document.querySelector('.suggestion');

    whyDiv.innerHTML = '';
    suggestionDiv.innerHTML = '';

    loader.style.display = 'flex';

    setTimeout(() => {
        loader.style.display = 'none';

        let reasons = [];
        let suggestions = [];

        if (!password) {
            reasons.push("Password cannot be empty.");
            suggestionDiv.innerHTML = "<div class='details'><ul><li>Enter a valid password first.</li></ul></div>";
            whyDiv.innerHTML = "<div class='result-text'>Weak Password ❌</div><div class='details'><ul><li>Password is missing.</li></ul></div>";
            return;
        }

        if (password.length < 8) {
            reasons.push("Password is too short.");
            suggestions.push("Use at least 8 characters.");
        }

        if (!/[A-Z]/.test(password)) {
            reasons.push("No uppercase letter found.");
            suggestions.push("Include at least one uppercase letter.");
        }

        if (!/[a-z]/.test(password)) {
            reasons.push("No lowercase letter found.");
            suggestions.push("Include at least one lowercase letter.");
        }

        if (!/[0-9]/.test(password)) {
            reasons.push("No number found.");
            suggestions.push("Include at least one digit.");
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            reasons.push("No special character found.");
            suggestions.push("Include symbols like !@#$%&*.");
        }

        if (name && password.toLowerCase().includes(name)) {
            reasons.push("Password contains your name.");
            suggestions.push("Avoid using your name in the password.");
        }

        let strength = "Strong Password ✅";
        if (reasons.length >= 3) strength = "Weak Password ❌";
        else if (reasons.length > 0) strength = "Moderate Password ⚠️";

let score = 0;

if (password.length >= 8) score++;
if (/[A-Z]/.test(password)) score++;
if (/[a-z]/.test(password)) score++;
if (/[0-9]/.test(password)) score++;
if (/[^A-Za-z0-9]/.test(password)) score++;
if (name && password.toLowerCase().includes(name)) score--;

if (score < 0) score = 0;
if (score > 5) score = 5;

const fill = document.getElementById("barFill");
fill.style.width = (score / 5) * 100 + "%";
fill.style.backgroundColor = score >= 4 ? "limegreen" : score >= 2 ? "orange" : "red";


whyDiv.innerHTML = `
    <div class="result-text">${strength}</div>
    ${reasons.length > 0 ? `<div class='details issues'><strong>Issues:</strong><ul>${reasons.map(r => `<li>${r}</li>`).join('')}</ul></div>` : ''}
`;

suggestionDiv.innerHTML = suggestions.length > 0 ? `
    <div class='details suggestions'><strong>Suggestions:</strong><ul>${suggestions.map(s => `<li>${s}</li>`).join('')}</ul></div>
` : '';


    }, 1500);
}
