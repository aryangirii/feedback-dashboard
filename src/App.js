// src/App.js
import React, { useEffect, useState } from "react";
import FeedbackList from "./FeedbackList";
import FeedbackChart from "./FeedbackChart";

function App() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://5zke0356zl.execute-api.us-east-1.amazonaws.com/prod/getFeedback")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setFeedbackData(data);
        else console.error("Invalid data format:", data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading feedback...</p>;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Customer Feedback Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: darkMode ? "#ffffff" : "#333333",
            color: darkMode ? "#000000" : "#ffffff",
            transition: "all 0.3s ease",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <FeedbackChart feedbackData={feedbackData} />
      <FeedbackList feedbackData={feedbackData} darkMode={darkMode} />
    </div>
  );
}

export default App;
