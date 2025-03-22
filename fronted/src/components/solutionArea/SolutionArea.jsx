import React, { useState } from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FiCopy } from "react-icons/fi";
import { FaCode } from "react-icons/fa";

const SolutionArea = ({ showCodeReview }) => {
  const [copyText, setCopyText] = useState("Copy");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(showCodeReview);
    setCopyText("Copied!");

    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  return (
    <div className="solution-area bg-black text-white p-5 rounded-lg shadow-lg border border-gray-700 max-h-screen ">
      
      <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-3">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaCode className="text-yellow-400" /> Solution Area
        </h2>
        <button
          onClick={copyToClipboard}
          className="copyCode flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
        >
          <FiCopy className="copyCode" /> {copyText}
        </button>
      </div>

      <div className="solutionArea bg-gray-900 p-6 rounded-lg shadow-md overflow-y-auto max-h-[100vh] ">
        <div className="prose prose-invert">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {showCodeReview || "No solution yet"}
          </Markdown>
        </div>
      </div>
    </div>
  );
};


export default SolutionArea;
