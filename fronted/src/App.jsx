import React, { useEffect, useState } from "react";
import "./index.css";
import Chat from "./components/chatArea/chatArea";
import SolutionArea from "./components/solutionArea/SolutionArea";
import Prism from "prismjs";

const App = () => {
  const [showCodeReview, setShowCodeReview] = useState("");  

  useEffect(() => {
    Prism.highlightAll(); 
  }, []); 

  return (
    <div className="Page1">

      <Chat Name={"Rishabh"} setShowCodeReview={setShowCodeReview} />
      <SolutionArea showCodeReview={showCodeReview} />
    </div>
  );
};

export default App;
