"use client";
import { useState } from "react";

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [style, setStyle] = useState("general");
  const [count, setCount] = useState(10);
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false); // <-- added

  const generateHashtags = async () => {
    if (!topic.trim()) return alert("Enter a topic");

    setLoading(true);
    setHashtags("");

    const res = await fetch("/api/hashtag-generator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, platform, style, count }),
    });

    const data = await res.json();
    setHashtags(data.hashtags);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h1 className="head">AI Hashtag Generator</h1>
      
      <p className="text">Smart Hashtags for Every Post.
Generate trending, relevant, and platform-optimized hashtags in seconds.</p>
      
      <input
        type="text"
        placeholder="Enter your topic or keyword"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-2">
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="flex-1 border p-2 rounded"
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>X/Twitter</option>
          <option>TikTok</option>
          <option>LinkedIn</option>
        </select>

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="flex-1 border p-2 rounded"
        >
          <option>general</option>
          <option>trending</option>
          <option>niche</option>
          <option>short</option>
          <option>long</option>
        </select>
        <input
          type="number"
          value={count}
          onChange={(e) => {
          const value = e.target.value;
          setCount(value === "" ? "" : Number(value));
         }}
          className="w-20 border p-2 rounded"
        placeholder="Count"
       />
      </div>

      <button
        onClick={generateHashtags}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Hashtags"}
      </button>
      {!hashtags&& (
      <div
       className="input"
       >Generated hashtags will appear here...</div>
      )}
      
      {hashtags && (
        <div className="bg-gray-100 p-4 rounded mt-4 whitespace-pre-wrap font-Montserrat">
          {hashtags}
          <br />
          <br />
          <button
            onClick={() => {
              navigator.clipboard.writeText(hashtags);
              setCopied(true);
              setTimeout(() => setCopied(false), 5000); // Reset after 5 sec
            }}
            className="mt-2 px-3 py-1 border rounded bg-gray-700 text-white"
          >
            {copied ? "Copied!" : "Copy Hashtags"}
          </button>
        </div>
      )}
    </div>
  );
}
