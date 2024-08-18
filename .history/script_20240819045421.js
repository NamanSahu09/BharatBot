const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

const toggleThemeButton = document.querySelector("#toggle-theme-button");

const deleteChatButton = document.querySelector("#delete-chat-button");

const suggestions = document.querySelectorAll(".suggestion-list .suggestion");


let userMessage = null;

let isRespons


//API CONFIG
const API_KEY = "AIzaSyCC4J9ZcYaky35eRXQZtMv5Wga1-Mqfz_s";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;



// Load local storage data
const loadLocalStorageData = () => {

  const savedChats = localStorage.getItem("savedChats");

  const themeColor = localStorage.getItem("themeColor");

  // Applying the stored theme directly fetched from the local storage
  const isLightMode = themeColor === "light_mode";
  document.body.classList.toggle("light_mode", isLightMode);
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";




  chatList.innerHTML = savedChats || ""; //Restore saved chats


  document.body.classList.toggle("hide-header", savedChats);
  chatList.scrollTo(0,chatList.scrollHeight);

};

loadLocalStorageData();

//Create a new message element
const createMessageElement = (content, ...classes) =>
{
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
}

//Show typing effect
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
  const words = text.split(' ');
  let currentWordIndex = 0;


  const typingInterval = setInterval(() => {
    textElement.innerText += (currentWordIndex === 0 ? '': ' ') + words[currentWordIndex++];
    incomingMessageDiv.querySelector(".icon").classList.add("hide");

    //If all words displayed then ... 
    if(currentWordIndex === words.length) {
      clearInterval(typingInterval);
      localStorage.setItem("savedChats", chatList.innerHTML);
      chatList.scrollTo(0, chatList.scrollHeight);
    }
    chatList.scrollTo(0,chatList.scrollHeight);
  },75);
}




const generateAPIResponse = async (incomingMessageDiv) => {

  const textElement = incomingMessageDiv.querySelector(".text");



  //Send a POST request to the API with the user's messge
try{
const response = await fetch(API_URL, {
  method: "POST",
  headers: {"Content-Type" : "application/json"},
  body: JSON.stringify({
    contents: [{
      role: "user",
      parts: [{text: userMessage}]
    }]
  })
});


const data = await response.json();

//Get API Response text and remove asterisks from it
const apiResponse = data?.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
showTypingEffect(apiResponse, textElement, incomingMessageDiv);
// textElement.innerText = apiResponse;


}
catch (error)
{
  console.log(error);
}
finally
{
  incomingMessageDiv.classList.remove("loading");
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
      <span onclick="copyMessage(this)"  class="icon material-symbols-rounded">
        content_copy
        </span> `;
      
      const incomingMessageDiv = createMessageElement(html, "incoming","loading");
      // incomingMessageDiv.querySelector(".text").innerText = userMessage;

      chatList.appendChild(incomingMessageDiv);

      chatList.scrollTo(0,chatList.scrollHeight);
      generateAPIResponse(incomingMessageDiv);
}

//copy msg to clipboard
const copyMessage = (copyIcon) =>
{
  const messageText = copyIcon.parentElement.querySelector(".text").innerText;
  navigator.clipboard.writeText(messageText);
  copyIcon.innerText = "done"  // tick mark
  setTimeout(() => copyIcon.innerText = "content_copy", 1000); // revert icon after 1 second
}







//OutGOing Chat handle krna
const handleOutgoingChat = () => {
  userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
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
  chatList.scrollTo(0,chatList.scrollHeight);
  document.body.classList.add("hide-header");//hide the header once chat start.
  setTimeout(showLoadingAnimation, 500); // show animation after some time 500ms
}


suggestions.forEach(suggestion => {
  suggestion.addEventListener("click", () => {
    userMessage = suggestion.querySelector(".text").innerText;
  handleOutgoingChat();
});
});




//TOggle theme button
toggleThemeButton.addEventListener("click", () => {
 const isLightMode = document.body.classList.toggle("light_mode");
 localStorage.setItem("themeColor" , isLightMode ? "light_mode" : "dark_mode")
 toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});



//Delete all chats from local storage
deleteChatButton.addEventListener("click", () =>
{
  if(confirm("Are you sure you want to delete all the conversation?"))
  {
    localStorage.removeItem("savedChats");
    loadLocalStorageData();
  }
})

typingForm.addEventListener("submit", (e) =>
{
e.preventDefault();
handleOutgoingChat();
});