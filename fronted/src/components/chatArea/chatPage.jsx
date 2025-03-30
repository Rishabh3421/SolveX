// src/components/ChatPage.jsx
import React, { useState } from "react";
import Chat from "./chatArea"; 
import SolutionArea from "../solutionArea/SolutionArea"; 
import Navigation from "../NavBar/Naviagtion"; 

const ChatPage = ({ session }) => {
    const [showCodeReview, setShowCodeReview] = useState('');

    return (
        <div className="flex flex-col h-screen w-screen p-4 overflow-hidden bg-zinc-950">
            <Navigation userName={session.user.email} /> 
        
            <div className="flex flex-row justify-center">
                <div className="flex-1 bg-zinc-900 rounded-2xl shadow-lg overflow-hidden">
                    <Chat setShowCodeReview={setShowCodeReview} session={session} />
                </div>

                <div className="">
                    <SolutionArea showCodeReview={showCodeReview} />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
