// src/FeedbackList.js
import React from "react";

const FeedbackList = ({ feedbackData, darkMode }) => {
  if (!Array.isArray(feedbackData) || feedbackData.length === 0) {
    return <p>No feedback available.</p>;
  }

  const sortedFeedback = [...feedbackData].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div>
      <h2>Customer Feedback</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sortedFeedback.map((item, index) => (
          <li
            key={index}
            style={{
              backgroundColor: darkMode ? "#1f1f1f" : "#f5f5f5",
              margin: "10px 0",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              color: darkMode ? "#ddd" : "#000",
            }}
          >
            <p style={{ fontSize: "18px" }}>
              <strong>{item.emoji}</strong> {item.feedback}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Sentiment:</strong> {item.sentiment}
            </p>
            <p style={{ fontSize: "12px", color: darkMode ? "#aaa" : "#666" }}>
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
