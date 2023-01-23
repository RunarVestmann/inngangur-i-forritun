const suggestionElement = document.getElementById("suggestion");
const url = "https://www.boredapi.com/api/activity";

async function fetchSuggestion() {
  const response = await fetch(url);
  const data = await response.json();
  suggestionElement.innerText = data.activity;
}

fetchSuggestion();
