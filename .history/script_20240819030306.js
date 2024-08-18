const typingForm = document.querySelector(".typing-form");

let userMessage = null;

const createMessageElement = (content, className) =>
{
  const div = document.createElement("div")
}
const handleOutgoingChat = () =>
{
userMessage = typingForm.querySelector(".typing-input").value.trim();
if(!userMessage) return; //exit if no message

const html = `<div class="message-content">
        <img src="/Images/J.A.R.V.I.S..webp" alt="User Image" class="avatar">
        <p class="text"></p>
      </div>`;
      
      createMessageElement(html, "outgoing");
}


typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});