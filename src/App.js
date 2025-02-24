import React, { useState } from "react";
import "./App.css";
import { getBotResponse, learnNewResponse } from "./components/BotData";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [input, setInput] = useState("");

  const startNewChat = () => {
    if (currentChat.length > 0) {
      setChatHistory((prevHistory) => [...prevHistory, currentChat]);
    }
    setCurrentChat([]);
  };

  const deleteChat = (index) => {
    setChatHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (input.trim() === "") return;
  
    const userMessage = { text: input, sender: "user" };
    setCurrentChat((prevChat) => [...prevChat, userMessage]);
  
    if (input.toLowerCase().startsWith("het betekent")) {
      const meaning = input.slice("het betekent".length).trim();
      if (meaning) {
        const botMessage = { text: learnNewResponse(meaning, meaning), sender: "bot" };
        setTimeout(() => {
          setCurrentChat((prevChat) => [...prevChat, botMessage]);
        }, 500);
      } else {
        const botMessage = { text: "Wat betekent het? Kun je dat uitleggen?", sender: "bot" };
        setTimeout(() => {
          setCurrentChat((prevChat) => [...prevChat, botMessage]);
        }, 500);
      }
    } else {
      const botMessage = { text: getBotResponse(input), sender: "bot" };
      setTimeout(() => {
        setCurrentChat((prevChat) => [...prevChat, botMessage]);
      }, 500);
    }
  
    setInput("");
  };

  return (
    <div className="App">
      <h1>AI Noivern - Stel je vraag</h1>
      <div className="chat-container">
        <div className="chat-history">
          <h2>Chatgeschiedenis</h2>
          <button onClick={startNewChat}>New Chat</button>

          <ul>
  {chatHistory.map((chat, index) => (
    <li key={index} onClick={() => setCurrentChat(chat)}>
      <span>Chat {index + 1}</span>
      <span onClick={(e) => {
        e.stopPropagation();
        deleteChat(index);
      }} className="delete-icon">🗑️</span>
    </li>
  ))}
</ul>
        </div>
        <div className="chat-window">
          {currentChat.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Typ een bericht..."
        />
        <button onClick={handleSend}>Versturen</button>
      </div>
    </div>
  );
}

export default App;