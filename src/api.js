export async function fetchFeedback() {
  const response = await fetch("https://5zke0356zl.execute-api.us-east-1.amazonaws.com/prod/getFeedback");
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}
