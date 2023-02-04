const newsElement = document.getElementById("news");
const url = "/api/news";
const characterLimit = 300;

function toggleNewsItemContent(newsItemId) {
  const contentElement = document.getElementById(newsItemId);
  const buttonElement = document.getElementById(`${newsItemId}-button`);

  if (contentElement.dataset.expanded === "true") {
    contentElement.dataset.expanded = false;
    buttonElement.innerText = "Sjá meira";
    contentElement.innerText =
      contentElement.dataset.content.slice(0, characterLimit) + "...";
  } else {
    contentElement.dataset.expanded = true;
    buttonElement.innerText = "Sjá minna";
    contentElement.innerText = contentElement.dataset.content;
  }
}

function getNewsItemHtml(newsItem) {
  const date = new Date(newsItem.date);
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();

  const isContentLongerThanCharacterLimit =
    newsItem.content.length > characterLimit;

  let contentToShow = newsItem.content.slice(0, characterLimit);
  if (isContentLongerThanCharacterLimit) {
    contentToShow += "...";
  }

  return `
    <div  class="news-item">
        <div style="display: flex; flex-flow: row nowrap; justify-content: space-between">
          <a href="/news/${newsItem.id}">Breyta frétt</a>
          <small>${day} ${time}</small>
        </div>
        <h2>${newsItem.title}</h2>
        <p id="${newsItem.id}" data-content="${
    newsItem.content
  }" data-expanded="false">
          ${contentToShow}
        </p>
        ${
          isContentLongerThanCharacterLimit
            ? `<div class="see-more-button">
                <button id="${newsItem.id}-button" onclick="toggleNewsItemContent(${newsItem.id})">
                  Sjá meira
                </button>
              </div>`
            : ""
        }
    </div>
  `;
}

async function createNewsItem() {
  const title = prompt("Titill:");

  if (!title) {
    alert("Frétt þarf að innihalda titil!");
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title: title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    alert("Ekki tókst að stofna frétt!");
    return;
  }

  const data = await response.json();
  newsElement.innerHTML = getNewsItemHtml(data) + newsElement.innerHTML;
}

async function fetchNews() {
  const response = await fetch(url);
  const data = await response.json();

  const news = [];

  for (const newsItem of data.news) {
    news.push(getNewsItemHtml(newsItem));
  }

  news.reverse();

  newsElement.innerHTML = news.join("");
}

fetchNews();
