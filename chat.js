const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const responseOutput = document.getElementById("response-output");

userInput.addEventListener("input", () => {
  submitBtn.disabled = userInput.value.trim() === "";
});

function displayResponse(responseText) {
  responseOutput.innerHTML = `<p>${responseText}</p>`;
  responseOutput.classList.add("visible");
}

function addToHistory(prompt, response) {
  const li = document.createElement("li");
  li.textContent = prompt.length > 30 ? prompt.slice(0, 30) + "..." : prompt;
  li.onclick = () => {
    userInput.value = prompt;
    displayResponse(response);
  };
  document.getElementById("chat-history").prepend(li);
}

async function handleSubmit() {
  const input = userInput.value.trim();
  if (!input) return;

  displayResponse("Thinking...");
  submitBtn.disabled = true;

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();
    const response = data.response || data.error || "No response.";
    displayResponse(response);
    addToHistory(input, response);
  } catch (err) {
    displayResponse("Something went wrong. Please try again.");
    console.error("Fetch error:", err);
  }

  userInput.value = "";
  submitBtn.disabled = true;
}

document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  handleSubmit();
});
