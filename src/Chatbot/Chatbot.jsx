import React, { useState } from "react";
import "./Chatbot.css";
import "./ChatbotConfig";
import modeSetter from "./ChatbotConfig";

function Codibot() {

    const handleSelectChange = (event) => {
        modeSetter(event.target.value);
        // alert(event.target.value)
      };

  return (
    <>
      <main>
        <section className="chatbot-container">
          <div className="chatbot-header">
            <img src="/icon.jpeg" className="logo" />
            <h1>Codibot</h1>
            <h2>Ask me anything!</h2>
            <select name="cars" id="p_type" onChange={handleSelectChange}>
              <option value="You are a highly knowledgeable assistant that is always happy to help.">Helpfull.</option>
              <option value="You are a highly sarcastic assistant.">Sarcatic.</option>
              <option value="You are a assistant who gave answers in a form of poetry">Poetic.</option>

            </select>
            <p className="supportId">User ID: 2344</p>
          </div>
          <div
            className="chatbot-conversation-container"
            id="chatbot-conversation"
          >
            <div className="speech speech-ai">How can I help you?</div>
          </div>
          <form id="form" className="chatbot-input-container">
            <input name="user-input" type="text" id="user-input" required />
            <button id="submit-btn" className="submit-btn">
              {/* <img 
							src="images/send-btn-icon.png" 
							class="send-btn-icon"
						/> */}

              <div className="send-btn-icon"> Send</div>
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Codibot;
