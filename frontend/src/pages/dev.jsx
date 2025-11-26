import React, { useState } from "react";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";


const displayConfetti = () =>{
    confetti()
}
const PythonEditor = () => {
  const [code, setCode] = useState('print("Hello")');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Fake code executor — only checks for print("Hello")
  const runCode = () => {
    try {
      if (code.includes('print("Hello"') || code.includes("print('Hello'")) {
        setOutput("Hello");
        setError("");
        toast.success("Tacno!")
        displayConfetti()
      } else {
        setOutput("");
        setError("❌ Output does not match expected result.");
        toast.error("Pokusaj ponovo!")
      }
    } catch (err) {
      setError("Error running code: " + err.message);
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(code);

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "solution.py";
    a.click();
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-3">Python Exercise</h2>

      <div className="flex gap-2 mb-3">
        <button onClick={runCode} className="btn btn-primary btn-sm">
          ▶ Run
        </button>
        <button onClick={handleCopy} className="btn btn-sm">
          Copy
        </button>
        <button onClick={handleDownload} className="btn btn-sm">
          Download
        </button>
      </div>

      <CodeMirror
        value={code}
        height="200px"
        extensions={[python()]}
        theme="dark"
        onChange={(value) => setCode(value)}
      />

      <div className="mt-4 p-3 bg-black text-green-400 font-mono rounded-md h-24 overflow-auto">
        <span className="text-gray-400">Output:</span>
        <pre>{output}</pre>
        {error && <pre className="text-red-400">{error}</pre>}
      </div>
    </div>
  );
};

export default PythonEditor;
