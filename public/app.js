// Helper function to show loading message
function showLoadingMessage(message) {
  const loadingMessage = document.getElementById("loadingMessage");
  loadingMessage.textContent = message;
  if (message) {
    setTimeout(() => {
      loadingMessage.textContent = "";
    }, 3000); // Auto-hide loading message after 3 seconds
  }
}

// Helper function to show error message
function showErrorMessage(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  if (message) {
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 5000); // Auto-hide error message after 5 seconds
  }
}

// Helper function to show toast notifications
function showToast(message, type) {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `p-4 rounded shadow-md text-white ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "transition-opacity", "duration-500");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Helper function to show listing details
function showListingDetails(listing) {
  const listingOutput = document.getElementById("listingOutput");
  if (listing && Object.keys(listing).length > 0) {
    const {
      price,
      bedrooms,
      bathrooms,
      squareFootage,
      propertyType,
      yearBuilt,
      lotSize,
      address,
    } = listing;

    listingOutput.innerHTML = `
      <div class="bg-white shadow-md rounded-lg p-6 mb-6">
        ${
          address
            ? `<p class="text-gray-700 text-lg mb-2 border-b pb-2"><strong class="font-semibold">📍 Address:</strong> ${address}</p>`
            : ""
        }
        ${
          price
            ? `<p class="text-gray-700 mb-2"><strong class="font-semibold">🏡 Price:</strong> $${price.toLocaleString()}</p>`
            : ""
        }
        ${
          bedrooms
            ? `<p class="text-gray-700 mb-2"><strong class="font-semibold">🛏️ Bedrooms:</strong> ${bedrooms}</p>`
            : ""
        }
        ${
          bathrooms
            ? `<p class="text-gray-700 mb-2"><strong class="font-semibold">🛁 Bathrooms:</strong> ${bathrooms}</p>`
            : ""
        }
        ${
          squareFootage
            ? `<p class="text-gray-700 mb-2"><strong class="font-semibold">📏 Square Footage:</strong> ${squareFootage.toLocaleString()} sqft</p>`
            : ""
        }
        ${
          lotSize
            ? `<p class="text-gray-700 mb-2"><strong class="font-semibold">🌳 Lot Size:</strong> ${lotSize.toLocaleString()} sqft</p>`
            : ""
        }
        ${
          yearBuilt
            ? `<p class="text-gray-700 mb-2"><strong class="font-semibold">📅 Year Built:</strong> ${yearBuilt}</p>`
            : ""
        }
        ${
          propertyType
            ? `<p class="text-gray-700 mb-2"><strong class="font-semibold">🏠 Property Type:</strong> ${propertyType}</p>`
            : ""
        }
      </div>
    `;
  } else {
    listingOutput.innerHTML = `
      <div class="text-center text-gray-500">
        <p>No detailed property information was available for this listing.</p>
        <p class="mt-2">You can still proceed with next steps like mortgage pre-approval and inspection scheduling!</p>
      </div>
    `;
  }
}

// Helper function to show next steps
function showNextSteps(nextSteps) {
  const nextStepsList = document.getElementById("nextStepsOutput");
  nextStepsList.innerHTML = ""; // Clear previous steps
  nextSteps.forEach((step) => {
    const listItem = document.createElement("li");
    listItem.className =
      "text-gray-700 text-base pl-2 cursor-pointer opacity-100 transition-opacity duration-300";
    listItem.textContent = step;

    // Add click event listener to toggle completion
    listItem.addEventListener("click", () => {
      listItem.classList.toggle("line-through");
      listItem.classList.toggle("text-gray-400");
      listItem.classList.toggle("opacity-50");
    });

    nextStepsList.appendChild(listItem);
  });
}

// Helper function to dynamically generate tasks based on listing data
function generateTasks(listingData) {
  const tasks = [
    "Get pre-approved for a mortgage",
    "Schedule a home inspection",
    "Check flood risk for the property",
  ];

  // Add conditional task based on price
  const price = parseInt(listingData.price.replace(/[^0-9]/g, ""), 10);
  if (price > 400000) {
    tasks.push("Schedule a property appraisal");
  }

  // Get the Next Steps output container
  const nextStepsOutput = document.getElementById("nextStepsOutput");
  nextStepsOutput.innerHTML = ""; // Clear existing tasks

  // Render tasks dynamically
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task;
    taskItem.className =
      "bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all";
    nextStepsOutput.appendChild(taskItem);
  });
}

// Refactored parseListing function
async function parseListing() {
  const parseButton = document.getElementById("parseButton");
  const parseButtonText = document.getElementById("parseButtonText");
  const spinner = document.getElementById("spinner");
  const url = document.getElementById("listingUrl").value;

  // Update button state to show loading
  parseButton.disabled = true;
  parseButtonText.classList.add("hidden");
  spinner.classList.remove("hidden");

  try {
    // Reset messages and outputs
    resetUI();

    if (!url) {
      showErrorMessage("Please paste a URL first.");
      return;
    }

    showLoadingMessage("Loading...");

    const data = await fetchListingData(url);

    if (data) {
      handleSuccess(data);
      showToast("Listing parsed successfully!", "success");

      // Scroll to listing output after success
      const listingOutput = document.getElementById("listingOutput");
      listingOutput.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      showErrorMessage("Error parsing listing. Please try again.");
      showToast("Failed to parse listing.", "error");
    }
  } catch (error) {
    handleError(error);
    showToast("Failed to parse listing.", "error");
  } finally {
    // Reset button state
    parseButton.disabled = false;
    parseButtonText.classList.remove("hidden");
    spinner.classList.add("hidden");
  }
}

// Helper function to reset UI elements
function resetUI() {
  showLoadingMessage("");
  showErrorMessage("");
  showListingDetails(null);
  showNextSteps([]);
}

// Helper function to fetch listing data
async function fetchListingData(url) {
  const response = await fetch("http://localhost:3000/api/parse-listing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (response.ok) {
    return await response.json();
  }

  return null;
}

// Helper function to handle success response
function handleSuccess(data) {
  console.log("🚀 Listing API Response:", data);
  showListingDetails(data.listing);
  generateTasks(data.listing);
  showToast("Listing parsed successfully!", "success");

  const nextSteps = [
    "Review the property details.",
    "Get pre-approved for a mortgage.",
    "Schedule a home inspection.",
    "Prepare your offer letter.",
  ];

  showNextSteps(nextSteps);
}

// Helper function to handle errors
function handleError(error) {
  showToast("Failed to parse listing.", "error");
  console.error("API call failed:", error);
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const parseButton = document.getElementById("parseButton");
  const listingUrl = document.getElementById("listingUrl");
  const listingOutput = document.getElementById("listingOutput");

  parseButton.addEventListener("click", async () => {
    const url = listingUrl.value;
    if (!url) {
      listingOutput.textContent = "Please provide a URL.";
      return;
    }

    listingOutput.textContent = "Loading...";

    try {
      const response = await fetch("http://localhost:3000/api/parse-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        listingOutput.textContent = JSON.stringify(data, null, 2);
      } else {
        listingOutput.textContent = "Failed to fetch listing details.";
      }
    } catch (error) {
      listingOutput.textContent =
        "An error occurred while fetching the listing.";
    }
  });
});
