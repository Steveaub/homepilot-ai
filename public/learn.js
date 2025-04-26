// Fetch topics from topics.json and dynamically populate the page
window.addEventListener("DOMContentLoaded", async () => {
  const topicContentDiv = document.getElementById("topicContent");
  const topicButtonsDiv = document.getElementById("topicButtons");

  try {
    // Fetch and parse topics.json
    const response = await fetch("/topics.json");
    const topics = await response.json();

    // Load the first topic by default
    const topicKeys = Object.keys(topics);
    if (topicKeys.length > 0) {
      loadTopic(topicKeys[0], topics);
    }

    // Create buttons for each topic
    topicKeys.forEach((key) => {
      const button = document.createElement("button");
      button.textContent = topics[key].title;
      button.addEventListener("click", () => loadTopic(key, topics));
      topicButtonsDiv.appendChild(button);
    });
  } catch (error) {
    console.error("Error loading topics:", error);
  }
});

// Function to load a topic's content
function loadTopic(key, topics) {
  const topicContentDiv = document.getElementById("topicContent");
  const topicButtonsDiv = document.getElementById("topicButtons");

  topicContentDiv.innerHTML = topics[key].content;

  // Update active button styling
  Array.from(topicButtonsDiv.children).forEach((btn) =>
    btn.classList.remove("active")
  );
  const activeButton = Array.from(topicButtonsDiv.children).find(
    (btn) => btn.textContent === topics[key].title
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}
