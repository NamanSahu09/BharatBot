const typingForm = document.querySelector(".typing-form");

let userMessage = null;


const handleOutgoingChat = () =>
{
userMessage = typingForm.querySelector(".typing-input").ariaValueMax.trim
}


typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});