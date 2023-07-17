import React, { useState } from "react";
import "./index.css";
import { process } from "./env.js";
import { Configuration, OpenAIApi } from "openai";

function MoviewWara() {
  const [textareaValue, setTextareaValue] = useState("");
  const setupTextarea = document.getElementById("setup-textarea");
  const setupInputContainer = document.getElementById("setup-input-container");
  const movieBossText = document.getElementById("movie-boss-text");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the textarea value
    console.log(textareaValue);
    fetchBotResponse(textareaValue)
  };

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  async function fetchBotResponse(Input) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: Input,
      max_tokens: 50,
    });
    console.log(response.data.choices[0].text);
  }

  function fetchBotReply() {
    let userInput = setupTextarea.textContent;
    console.log(userInput);
    if (setupTextarea.value) {
      setupInputContainer.innerHTML = `<img src="/loading.svg" class="loading" id="loading">`;
      movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
    }
    // console.log(response.data.choices[0].text);
  }

  return (
    <div>
      <header>
        <a href="/">
          <span>Movie</span>Pitch
        </a>
      </header>
      <main>
        <section id="setup-container">
          <div className="setup-inner">
            <div className="speech-bubble-ai" id="speech-bubble-ai">
              <p id="movie-boss-text">
                Give me a one-sentence concept and I'll give you an eye-catching
                title, a synopsis the studios will love, a movie poster... AND
                choose the cast!
              </p>
            </div>
          </div>
          <div
            className="setup-inner setup-input-container"
            id="setup-input-container"
          >
            <textarea
              id="setup-textarea"
              placeholder="An evil genius wants to take over the world using AI."
              value={textareaValue}
              onChange={handleTextareaChange}
            ></textarea>
            <button
              className="send-btn"
              id="send-btn"
              aria-label="send"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </section>
        <section className="output-container" id="output-container">
          <div id="output-img-container" className="output-img-container"></div>
          <h1 id="output-title"></h1>
          <h2 id="output-stars"></h2>
          <p id="output-text"></p>
        </section>
      </main>
      <footer>&copy; 2023 MoviePitch All rights reserved</footer>
    </div>
  );
}

export default MoviewWara;
