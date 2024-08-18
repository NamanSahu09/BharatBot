const typingForm = document.querySelector(".typing-form");

let userMessage = null;


const handleOutgoingChat = () =>
{
userMessage = typingForm.querySelector(".typing-input")
}


typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});