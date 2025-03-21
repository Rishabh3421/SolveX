import React, { useState } from 'react';
import { ArrowUp, Globe, Plus } from "lucide-react";
import Editor from 'react-simple-code-editor';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import axios from "axios";

const Chat = ({ Name, setShowCodeReview }) => {  // Receive setShowCodeReview as a prop
  const [query, setQuery] = useState("function sum(a, b) {\n  return a + b;\n}");
  const [messages, setMessages] = useState([]);
  const [showHeading, setShowHeading] = useState(true);

  async function codeReview() {
    try {
      const response = await axios.post(
        "http://localhost:9000/ai/get-review",
        { code: query }, 
        { headers: { "Content-Type": "application/json" } }
      );

      if (typeof setShowCodeReview === "function") {   // Ensure setShowCodeReview is a function before calling
        setShowCodeReview(response.data);
      } else {
        console.error("setShowCodeReview is not a function");
      }

      if (query.trim()) {
        setMessages([...messages, query]);
        setQuery("");
        setShowHeading(false);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="main">
      {showHeading && (
        <div className="heading">
          <h1>Hi, {Name}</h1>
          <h1>What can I help you with?</h1>
          <p className="prompt">
            Choose a prompt below or write your own to start chatting with Solvex
          </p>
        </div>
      )}
      <div className="messageBox w-[50%] bottom-0">
        {messages.map((msg, index) => (
          <div key={index} className="chatHistory pb-6 mb-2 flex gap-3 bg-gray-100 rounded-md my-1">
            {msg}
          </div>
        ))}
        <Editor
          className="editor w-full p-3 border border-gray-300 rounded-lg font-sm text-gray-700"
          value={query}
          onValueChange={(value) => setQuery(value)}
          highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
          padding={10}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              codeReview();
            }
          }}
        />
        <button title="Upload files and more" className="left-3 top-16 text-gray-500 hover:text-black">
          <Plus size={20} />
        </button>
        <button title="Search" className="left-12 top-16 text-gray-500 hover:text-black">
          <Globe size={20} />
        </button>
        <button title="Send" className="right-3 top-16 text-gray-500 hover:text-black" onClick={codeReview}>
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
