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

const showLoadingAnimation = () => {
  const html = `  <!-- <div class="message incoming loading" >
      <div class="message-content">
        <img src="/Images/gemini.svg" alt="Gemini Image" class="avatar">
        <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius mollitia tempora, perspiciatis debitis optio recusandae. Distinctio harum dolore</p>
        <div class="loading-indicator">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </div>
      <span class="icon material-symbols-rounded">
        content_copy
        </span>
    </div> -->`;
      
      const incomingMessageDiv = createMessageElement(html, "incoming","loading");
      incomingMessageDiv.querySelector(".text").innerText = userMessage;
      chatList.appendChild(incomingMessageDiv);
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
      outgoingMessageDiv.querySelector(".text").innerText = userMessage;
      chatList.appendChild(outgoingMessageDiv);


      typingForm.requestFullscreen();
      setTimeout(showLoadingAnimation,500);



}


typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});