import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FiCopy } from "react-icons/fi";
import { FaCode } from "react-icons/fa";

const SolutionArea = ({ showCodeReview, isLoading }) => {
  const [copyText, setCopyText] = useState("Copy");
  const [solution, setSolution] = useState("");

  // Load the saved solution from localStorage on component mount
  useEffect(() => {
    const savedSolution = localStorage.getItem("savedSolution");
    if (savedSolution) {
      setSolution(savedSolution);
    }
  }, []);

  // Update solution state and save to localStorage when showCodeReview changes
  useEffect(() => {
    if (showCodeReview) {
      setSolution(showCodeReview);
      localStorage.setItem("savedSolution", showCodeReview);
    }
  }, [showCodeReview]);

  const copyToClipboard = () => {
    if (solution) {
      navigator.clipboard.writeText(solution);
      setCopyText("Copied!");
    
      setTimeout(() => {
        setCopyText("Copy");
      }, 2000);
    }
  };

  return (
    <div className="text-white w-[48vw] overflow-hidden rounded-xl leading-9 h-full relative  bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-700 pb-3 px-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FaCode className="text-yellow-400" /> Solution
        </h2>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition px-3 py-1 rounded-lg text-sm"
          disabled={!solution}
        >
          <FiCopy /> {copyText}
        </button>
      </div>

      {/* Solution Content */}
      <div className="flex-1  overflow-y-auto custom-scrollbar px-4 prose prose-invert max-w-none tracking-wide h-[calc(100%-50px)]">
        {isLoading ? (
          <p className="text-gray-400 italic">*Thinking...*</p>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {solution || "Waiting for your code..."}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default SolutionArea;
