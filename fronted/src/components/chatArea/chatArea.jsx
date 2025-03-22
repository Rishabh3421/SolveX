import React, { useState } from "react";
import { ArrowUp, Globe, Plus } from "lucide-react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import axios from "axios";

const Chat = ({ Name, setShowCodeReview }) => {
  const [query, setQuery] = useState("Enter or Paste your code here...");
  const [messages, setMessages] = useState([]);
  const [showHeading, setShowHeading] = useState(true);

  async function codeReview() {
    if (!query.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:9000/ai/get-review",
        { code: query },
        { headers: { "Content-Type": "application/json" } }
      );

      if (typeof setShowCodeReview === "function") {
        setShowCodeReview(response.data);
      } else {
        console.error("setShowCodeReview is not a function");
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: query }, 
      ]);

      setQuery("");
      setShowHeading(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="main p-6">
      {showHeading && (
        <div className="heading chrome mb-6">
          <h1 className="text-xl font-semibold">Hi, {Name}</h1>
          <h1 className="text-lg">What can I help you with?</h1>
          <p className="prompt shine text-gray-600">
            Choose a prompt below or write your own to start chatting with Solvex
          </p>
        </div>
      )}

      {/* Message History */}
      <div className="messageBox  bg-gray-100 text-black text-3xl p-4 rounded-md mb-4 max-h-[80vh] overflow-auto flex flex-col gap-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatHistory bg-red-100 p-4 border border-gray-300 text-3xl rounded-md shadow-sm w-full ${
              msg.role === "user" ? "bg-gray-100 text-black" : "bg-gray-200 text-black"
            }`}
          >
            <Editor
              value={msg.content}
              onValueChange={(newCode) => {
                setMessages((prevMessages) => {
                  const updatedMessages = [...prevMessages];
                  updatedMessages[index] = { ...updatedMessages[index], content: newCode };
                  return updatedMessages;
                });
              }}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              readOnly={false} 
              className="historyMsg rounded-lg  bg-transparent"
            />
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="input rounded-md  p-3 bg-white shadow-md">
        <Editor
          className="editor w-full text-xl text-gray-700  min-h-[100px] max-h-[250px] overflow-auto rounded-lg p-3 "
          value={query}
          onValueChange={(newQuery) => setQuery(newQuery)} 
          highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
          padding={10}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              codeReview();
            }
          }}
        />

        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button title="Upload files and more" className="btn left-2 bottom-2 bg-red-200 text-gray-500 hover:text-black">
            <Plus size={20} />
          </button>
          <button title="Search" className="btn left-5 bottom-2 bg-red-200 text-gray-500 hover:text-black">
            <Globe size={20} />
          </button>
          <button title="Send" className="btn text-gray-500 bottom-2 bg-red-200 left-[85%] rotate-50 hover:text-black" onClick={codeReview}>
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
