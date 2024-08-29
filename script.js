document.getElementById("sendBtn").addEventListener("click", async function() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    // Display the user's message
    appendMessage(userInput, "user-message");

    // Clear the input
    document.getElementById("userInput").value = "";

    try {
        // Send the message to the OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer sk-9LhiUW-aDeogGrEzJZllILBK8_jjdV-G8czSnKAjfoT3BlbkFJkmEuWCRPqikQnN3OYAyrKyhIebMHcsvFMay-vFlDsA"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content.trim();

        // Display the bot's message
        appendMessage(botMessage, "bot-message");
    } catch (error) {
        console.error("Error:", error);
        appendMessage("Something went wrong. Please try again later.", "bot-message");
    }
});

function appendMessage(content, className) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;
    messageElement.textContent = content;
    document.getElementById("messages").appendChild(messageElement);
    messageElement.scrollIntoView();
}
