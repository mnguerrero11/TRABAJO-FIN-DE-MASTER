
async function analyzeImage() {
  const { imageUrl } = await chrome.storage.local.get("imageUrl");
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append("file", blob, "meme.jpg");

  const spinner = document.getElementById("spinner");
  const status = document.getElementById("status");
  const output = document.getElementById("output");

  spinner.style.display = "block";
  status.textContent = "Analyzing meme...";
  output.textContent = "";
  output.className = "output";

  try {
    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    spinner.style.display = "none";
    status.textContent = "Result:";

    const resultText = data.result || data.error || "No result";
    output.textContent = resultText;

    if (resultText.startsWith("NO")) {
      output.classList.add("green");
    } else if (resultText.startsWith("YES")) {
      output.classList.add("red");
    }

  } catch (err) {
    spinner.style.display = "none";
    status.textContent = "Error:";
    output.textContent = err.toString();
    output.classList.add("red");
  }
}

document.addEventListener("DOMContentLoaded", analyzeImage);
