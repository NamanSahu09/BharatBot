const typingForm = document.querySelector(".typing-form");

let userMessage = null;


const handleOutgoingChat = () =>
{
userMessage = typingForm.querySelector(".typing-input").value.trim();
if(!userMessage) return; //exit if no message

const html = `<div class="message-content">
        <img src="/Images/J.A.R.V.I.S..webp" alt="User Image" class="avatar">
        <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius mollitia tempora!</p>
      </div>`;
}


typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});