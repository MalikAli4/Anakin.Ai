document.getElementById("initial-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("initial-input").value.trim();
    if (!input) return;
  
    localStorage.setItem("chatHistory", JSON.stringify([{ role: "user", content: input }]));
    window.location.href = "chat.html";
  });
  