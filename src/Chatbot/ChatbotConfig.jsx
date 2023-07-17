import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { process } from "../env";

//
// Modes Setter
//

let mode = "You are a highly knowledgeable assistant that is always happy to help."

function modeSetter(param) {
    conversationArr[0].content = param;
}

export default modeSetter;

//
// Configuration of OPENAI_API_KEY
//
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

//
// Creation of OPENAI_API_CLASS Instance
//
const openai = new OpenAIApi(configuration);

//
// Creation of Converstaion Array
//
const conversationArr = [
  {
    role: "system",
    content:
      mode
  },
];

// "You are a highly knowledgeable assistant that is always happy to help.",

//
// Function for Calling OPENAI_API
//

async function fetchChat() {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: conversationArr,
    max_tokens: 100
  });
  conversationArr.push(response.data.choices[0].message)
  renderTypewriterText(response.data.choices[0].message.content)
  console.log(response);
}

//
// DOM Events for Controlling the UX Of Application
//

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const chatbotConversation = document.getElementById("chatbot-conversation");
  const userInput = document.getElementById("user-input");
  conversationArr.push({
    role: "user",
    content: userInput.value,
  });
  fetchChat();
  const newSpeechBubble = document.createElement("p");
  newSpeechBubble.classList.add("speech", "speech-human");
  newSpeechBubble.innerHTML = userInput;
  chatbotConversation.appendChild(newSpeechBubble);
  newSpeechBubble.textContent = userInput.value;
  userInput.value = "";
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
});

//
// Writter Placeholder for Fetch Response of OPENAI_API
//

function renderTypewriterText(text) {
  const chatbotConversation = document.getElementById("chatbot-conversation");
  const newSpeechBubble = document.createElement("div");
  newSpeechBubble.classList.add("speech", "speech-ai", "blinking-cursor");
  chatbotConversation.appendChild(newSpeechBubble);
  let i = 0;
  const interval = setInterval(() => {
    newSpeechBubble.textContent += text.slice(i - 1, i);
    if (text.length === i) {
      clearInterval(interval);
      newSpeechBubble.classList.remove("blinking-cursor");
    }
    i++;
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
  }, 50);
}

const inputElement = document.getElementById('user-input');
const buttonElement = document.getElementById('submit-btn');


// async function fetchBotResponse(input, max_Tokens, model) {
//   const response = await openai.createCompletion({
//     model: model ? model : "text-davinci-003",
//     prompt: input,
//     max_tokens: max_Tokens ? max_Tokens : 40,
//   });
//   console.log(response.data.choices[0].text);
//   return response;
// }
