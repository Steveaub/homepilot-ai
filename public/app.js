// Handles form submission and displays parsed data
async function parseListing() {
  const url = document.getElementById("listingUrl").value;
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const listingOutput = document.getElementById("listingOutput");
  const nextStepsList = document.getElementById("nextStepsOutput");

  // Reset messages and outputs
  loadingMessage.textContent = "";
  errorMessage.textContent = "";
  listingOutput.textContent = "";
  nextStepsList.innerHTML = "";

  if (!url) {
    errorMessage.textContent = "Please paste a URL first.";
    return;
  }

  loadingMessage.textContent = "Loading...";

  try {
    const response = await fetch("http://localhost:3000/api/parse-listing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (response.ok) {
      const data = await response.json();
      listingOutput.textContent = JSON.stringify(data.listing, null, 2);

      data.nextSteps.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        nextStepsList.appendChild(li);
      });
    } else {
      errorMessage.textContent = "Error parsing listing. Please try again.";
    }
  } catch (error) {
    errorMessage.textContent =
      "An unexpected error occurred. Please try again later.";
  } finally {
    loadingMessage.textContent = "";
  }
}
