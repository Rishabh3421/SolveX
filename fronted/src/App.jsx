import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { supabase } from "./DB/supabaseClient.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ChatPage from "./components/chatArea/chatPage.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Prevent redirect before session is loaded

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
        localStorage.setItem("supabaseSession", JSON.stringify(data.session));
      } else {
        const storedSession = localStorage.getItem("supabaseSession");
        if (storedSession) {
          setSession(JSON.parse(storedSession));
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        localStorage.setItem("supabaseSession", JSON.stringify(newSession));
      } else {
        localStorage.removeItem("supabaseSession");
      }
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  // Prevent redirect before checking session state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={session ? <Navigate to="/chat" replace /> : <Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setSession={setSession} />} />
        <Route path="/chat" element={session ? <ChatPage session={session} /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
