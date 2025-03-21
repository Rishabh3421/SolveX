import React from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FiCopy } from "react-icons/fi";
import { FaCode } from "react-icons/fa";

const SolutionArea = ({ showCodeReview }) => {
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(showCodeReview);
    alert("Copied to clipboard!");
  };

  return (
    <div className="solution-area bg-black text-white p-5 rounded-lg shadow-lg border border-gray-700">
      
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-3">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaCode className="text-yellow-400" /> Solution Area
        </h2>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
        >
          <FiCopy /> Copy
        </button>
      </div>

      {/* Markdown Display Section */}
      <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto shadow-md">
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
