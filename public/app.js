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
      console.log("🚀 Listing API Response:", data);

      // Safely check if data.listing exists and is non-empty
      if (data.listing && Object.keys(data.listing).length > 0) {
        listingOutput.textContent = `Here’s what we found!\n${JSON.stringify(
          data.listing,
          null,
          2
        )}`;
      } else {
        listingOutput.textContent = "No listing details available.";
      }

      // Simple next steps (can make dynamic later)
      const nextSteps = [
        "Review the property details.",
        "Get pre-approved for a mortgage.",
        "Schedule a home inspection.",
        "Prepare your offer letter.",
      ];

      nextSteps.forEach((step) => {
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
