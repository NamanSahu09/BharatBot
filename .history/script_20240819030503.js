const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
let userMessage = null;
//Create a new message element
const createMessageElement = (content, className) =>
{
  const div = document.createElement("div");
  div.classList.add("message", className);
  div.innerHTML = content;
  return div;
}
const handleOutgoingChat = () =>
{
userMessage = typingForm.querySelector(".typing-input").value.trim();
if(!userMessage) return; //exit if no message

const html = `<div class="message-content">
        <img src="/Images/J.A.R.V.I.S..webp" alt="User Image" class="avatar">
        <p class="text"></p>
      </div>`;
      
      const outgoingMessageDiv = createMessageElement(html, "outgoing");
      outgoingMessageDiv.querySelector(".text")
      chatList.appendChild(outgoingMessageDiv);

}


typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});