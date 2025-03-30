import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, Plus } from "lucide-react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import axios from "axios";
import { supabase } from "../../DB/supabaseClient.js";

const Chat = ({ session, setShowCodeReview }) => {
  const [query, setQuery] = useState("Enter or Paste your code here...");
  const [messages, setMessages] = useState([]);
  const [showHeading, setShowHeading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!session) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("chats")
        .select("user_id, role, message, created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: true });

      if (!error && data) {
        const formatted = data.map((msg) => ({
          role: msg.role,
          content: msg.message,
        }));
        setMessages(formatted);
      } else {
        console.error("Error fetching chats:", error);
      }
    };

    fetchMessages();
  }, [session]);

  async function codeReview() {
    if (!query.trim()) return;

    try {
      // Save user message to supabase
      const { error: insertUserError } = await supabase
        .from("chats")
        .insert([{ user_id: session.user.id, role: "user", message: query }]);

      if (insertUserError) throw insertUserError;

      setMessages((prev) => [...prev, { role: "user", content: query }]);

      // ✅ Clear the textarea
      setQuery("");

      // ✅ Get AI response
      const response = await axios.post(
        "http://localhost:9000/ai/get-review",
        { code: query },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Pass response to SolutionArea via props
      setShowCodeReview(response.data);

      // ✅ Save AI response to supabase
      const { error: insertAiError } = await supabase
        .from("chats")
        .insert([
          { user_id: session.user.id, role: "ai", message: response.data },
        ]);

      if (insertAiError) throw insertAiError;
    } catch (error) {
      console.error("Error during code review:", error.message || error);
    }
  }

  // Extract name from email
  const extractName = (email) => {
    const match = email.match(/^[a-zA-Z]+/);
    return match ? match[0] : "";
  };

  return (
    <div className="main">
      {/* Greeting */}
      {showHeading && messages.length === 0 && (
        <div className="heading shine mb-6 ">
        <h1 className="text-xl font-semibold whitespace-nowrap">
          Hi, {extractName(session.user.email)}
        </h1>
        <h1 className="text-lg whitespace-nowrap">What can I help you with?</h1>
      </div>
      
      )}

      {/* Only User Chat History */}
      <div className="messageBox bg-gray-100 text-black text-3xl p-2 rounded-md w-[51vw] h-[80vh] overflow-scroll flex flex-col gap-4">
        {messages
          .filter((msg) => msg.role === "user")
          .map((msg, index) => (
            <div
              key={index}
              className="chatHistory p-2  border border-gray-300 text-3xl rounded-md shadow-sm w-full bg-gray-100 text-black"
            >
              <Editor
                value={msg.content}
                highlight={(code) =>
                  Prism.highlight(
                    code,
                    Prism.languages.javascript,
                    "javascript"
                  )
                }
                padding={12}
                readOnly
                className="historyMsg rounded-lg bg-transparent"
              />
            </div>
          ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="input bg-white w-[51%] fixed bottom-0  p-2 rounded shadow-md">
        <textarea
          className="editor h-30 w-full border rounded p-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your code here..."
          style={{
            minHeight: "100px",
            maxHeight: "300px",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              codeReview();
            }
          }}
        />

        <div
          className="flex items-center justify-between"
          style={{ padding: "5px 10px" }}
        >
          <button
            title="Upload files and more"
            className="bg-zinc-900 h-[40px] w-[40px] rounded-full flex items-center justify-center text-gray-500 hover:text-white focus:outline-none focus:ring-0 border-0"
          >
            <Plus size={20} />
          </button>

          <button
            title="Send"
            className="bg-zinc-900 h-[40px] w-[40px] rotate-50 rounded-full flex items-center justify-center text-gray-500 hover:text-white focus:outline-none focus:ring-0 border-0"
            onClick={codeReview}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
