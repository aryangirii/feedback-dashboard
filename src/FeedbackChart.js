// src/FeedbackChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

const COLORS = {
  Positive: "#4CAF50",
  Negative: "#F44336",
  Neutral: "#FF9800",
  Mixed: "#2196F3",
};

const FeedbackChart = ({ feedbackData }) => {
  if (!Array.isArray(feedbackData)) {
    return <p>No data available to display chart.</p>;
  }

  const sentimentCounts = {
    Positive: 0,
    Negative: 0,
    Neutral: 0,
    Mixed: 0,
  };

  feedbackData.forEach((feedback) => {
    const rawSentiment = feedback.sentiment?.trim();
    const standardized =
      rawSentiment?.charAt(0).toUpperCase() + rawSentiment?.slice(1).toLowerCase();

    if (sentimentCounts.hasOwnProperty(standardized)) {
      sentimentCounts[standardized]++;
    }
  });

  const total = Object.values(sentimentCounts).reduce((a, b) => a + b, 0);

  const chartData = Object.keys(sentimentCounts).map((key) => ({
    name: key,
    count: sentimentCounts[key],
    percentage: total > 0 ? Math.round((sentimentCounts[key] / total) * 100) : 0,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip
            formatter={(value, name) =>
              name === "percentage"
                ? [`${value}%`, "Percentage"]
                : [value, "Count"]
            }
            labelFormatter={(label) => `${label}`}
          />
          <Bar dataKey="percentage">
            <LabelList dataKey="percentage" position="top" formatter={(val) => `${val}%`} />
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeedbackChart;
