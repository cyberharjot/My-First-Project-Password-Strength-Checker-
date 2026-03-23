document.addEventListener("DOMContentLoaded", () => {
  const title = document.title;

  if (title.includes("Sign Up")) {
    const form = document.querySelector(".login-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("signup-username").value.trim();
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Signup failed.");
          return;
        }

        alert("Account created! Redirecting to login...");
        window.location.href = "bruteforcelogin.html";
      } catch (err) {
        console.error(err);
        alert("Server error during signup.");
      }
    });
  }


  else if (title.includes("Login")) {
    const form = document.querySelector(".login-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Login failed.");
          return;
        }

        alert(`🎉 ${data.message}`);
      } catch (err) {
        console.error(err);
        alert("Server error during login.");
      }
    });
  }

  else if (title.includes("Brute Force")) {
    const select = document.getElementById("selectUser");
    const input = document.getElementById("customUser");
    const button = document.querySelector("button");
    const container = document.querySelector(".brute-force-container");

    let users = {};

    fetch("/api/users")
      .then((res) => res.json())
      .then((usernames) => {
        usernames.forEach((username) => {
          const option = document.createElement("option");
          option.value = username;
          option.textContent = username;
          select.appendChild(option);
        });

        return fetch("/users.json");
      })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((u) => {
          users[u.username] = u.password;
        });
      })
      .catch((err) => {
        console.error("Error loading users:", err);
      });

    button.addEventListener("click", () => {
      const selectedUser = select.value.trim();
      const typedUser = input.value.trim();
      const username = typedUser || selectedUser;

      container.querySelectorAll(".result-box").forEach((el) => el.remove());

      const progressBox = document.createElement("div");
      const tryingBox = document.createElement("div");

      progressBox.className = "result-box";
      tryingBox.className = "result-box";

      Object.assign(progressBox.style, {
        marginTop: "20px",
        padding: "12px",
        background: "#121212",
        border: "2px solid #00ffaa",
        borderRadius: "8px",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        color: "#00ffaa",
      });

      Object.assign(tryingBox.style, {
        marginTop: "10px",
        padding: "12px",
        background: "#1e1e1e",
        border: "2px dashed #888",
        borderRadius: "8px",
        fontFamily: "monospace",
        color: "#cccccc",
      });

      container.appendChild(progressBox);
      container.appendChild(tryingBox);

      if (!username || !users[username]) {
        progressBox.textContent = "❌ Username not found in database.";
        return;
      }

      const password = users[username];
      progressBox.textContent = `🔐 Cracking password for "${username}"...\n`;

      let guessed = "";
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

      const bruteForce = () => {
        if (guessed.length === password.length) {
          progressBox.textContent += `✅ Password cracked: ${guessed}`;
          tryingBox.textContent = "";
          return;
        }

        const targetChar = password[guessed.length];
        let charIndex = 0;

        const tryChar = () => {
          const attempt = guessed + charset[charIndex];
          tryingBox.textContent = `🔍 Trying: ${attempt}`;

          if (charset[charIndex] === targetChar) {
            guessed += targetChar;
            progressBox.textContent += `🟩 ${guessed}\n`;
            setTimeout(bruteForce, 300);
          } else {
            charIndex++;
            if (charIndex < charset.length) {
              setTimeout(tryChar, 50);
            }
          }
        };

        tryChar();
      };

      bruteForce();
    });
  }
});
