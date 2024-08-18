const typingForm = document.querySelector(".typing-form");

let userMessage = null;


const handleOutgoingChat = () =>
{
userMessage = typingForm.querySelector(".typing-input").value.trim();
if(!userMessage) return; //exit if no mesg


}


typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});