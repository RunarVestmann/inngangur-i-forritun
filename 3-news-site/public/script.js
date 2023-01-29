const newsElement = document.getElementById("news");
const url = "/api/news";

function getNewsItemHtml(newsItem) {
  const date = new Date(newsItem.date);
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();

  return `
    <a href="/news/${newsItem.id}" class="news-item">
        <small>${day} ${time}</small>
        <h2>${newsItem.title}</h2>
        <p>${newsItem.content}</p>
    </a>
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
