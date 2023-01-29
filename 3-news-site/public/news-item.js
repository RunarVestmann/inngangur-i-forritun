const url = "/api/news";
const titleElement = document.getElementById("title");
const contentElement = document.getElementById("content");

function getNewsItemIdFromQueryParams() {
  return new URLSearchParams(window.location.search).get("id");
}

const newsItemId = getNewsItemIdFromQueryParams();

async function fetchNewsItem(id) {
  const response = await fetch(`${url}/${id}`);

  if (!response.ok) {
    alert("Frétt fannst ekki");
    window.location.href = "/";
    return;
  }

  const data = await response.json();

  titleElement.value = data.title;
  contentElement.value = data.content;
}

async function submitChanges(event) {
  event.preventDefault();

  const title = titleElement.value;
  const content = contentElement.value;

  const response = await fetch(`${url}/${newsItemId}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    alert("Það gekk að vista breytingarnar");
  } else {
    alert("Það gekk ekki að vista breytingarnar!");
  }
}

async function deleteNewsItem() {
  const response = await fetch(`${url}/${newsItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "appliation/json",
    },
  });

  if (response.ok) {
    alert("Það gekk að eyða fréttinni");
  } else {
    alert("Það gekk ekki að eyða fréttinni");
  }

  window.location.href = "/";
}

fetchNewsItem(newsItemId);
