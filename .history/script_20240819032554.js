const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
let userMessage = null;

//API CONFIG
const API_KEY = "AIzaSyCC4J9ZcYaky35eRXQZtMv5Wga1-Mqfz_s";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;



//Create a new message element
const createMessageElement = (content, ...classes) =>
{
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
}

const generateAPIResponse = () => {
try{
const response 
}
catch (error)
{
  console.log(error);
}
}



//Show loading animation while waiting for API response
const showLoadingAnimation = () => {
  const html = `
      <div class="message-content">
        <img src="/Images/gemini.svg" alt="Gemini Image" class="avatar">
        <p class="text"></p>
        <div class="loading-indicator">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </div>
      <span class="icon material-symbols-rounded">
        content_copy
        </span> `;
      
      const incomingMessageDiv = createMessageElement(html, "incoming","loading");
      incomingMessageDiv.querySelector(".text").innerText = userMessage;
      chatList.appendChild(incomingMessageDiv);
      generateAPIResponse();
}



const handleOutgoingChat = () => {
  userMessage = typingForm.querySelector(".typing-input").value.trim();
  if (!userMessage) return; // exit if no message

  const html = `<div class="message-content">
      <img src="/Images/J.A.R.V.I.S..webp" alt="User Image" class="avatar">
      <p class="text"></p>
    </div>`;
    
  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.querySelector(".text").innerText = userMessage;
  chatList.appendChild(outgoingMessageDiv);

  // typingForm.requestFullscreen(); // Remove or comment out this line if you don't want fullscreen

  typingForm.querySelector(".typing-input").value = ""; // CLEAR input field
  setTimeout(showLoadingAnimation, 500); // show animation after some time 500ms
}


typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});