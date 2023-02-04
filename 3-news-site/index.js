const express = require("express");
const app = express();

const port = 3000;

const news = [
  {
    id: 1,
    title: "TEST frétt númer 1",
    content: `Lorem ipsum dolor sit amet. Ab tenetur sunt ut neque voluptatibus non repellendus ipsum ut galisum natus est suscipit totam eos voluptatem consequatur. In maxime assumenda in omnis rerum ea impedit vero ex consequatur nobis qui itaque alias ea dolor sunt. Vel voluptas laudantium ab sapiente itaque est pariatur ratione ea nemo atque et aliquam beatae?
    Qui aperiam soluta et laborum ullam ut quos facilis qui voluptatem molestiae. Et maxime quam aut temporibus amet aut quae recusandae.
    Id ullam galisum quo totam sint qui inventore quam. Et ipsam expedita quo obcaecati velit et ratione exercitationem ab odit eligendi. Sed expedita dolorem est deleniti atque aut temporibus minus. Lorem ipsum dolor sit amet. Ab tenetur sunt ut neque voluptatibus non repellendus ipsum ut galisum natus est suscipit totam eos voluptatem consequatur. In maxime assumenda in omnis rerum ea impedit vero ex consequatur nobis qui itaque alias ea dolor sunt. Vel voluptas laudantium ab sapiente itaque est pariatur ratione ea nemo atque et aliquam beatae?
    Qui aperiam soluta et laborum ullam ut quos facilis qui voluptatem molestiae. Et maxime quam aut temporibus amet aut quae recusandae.
    Id ullam galisum quo totam sint qui inventore quam. Et ipsam expedita quo obcaecati velit et ratione exercitationem ab odit eligendi. Sed expedita dolorem est deleniti atque aut temporibus minus. Lorem ipsum dolor sit amet. Ab tenetur sunt ut neque voluptatibus non repellendus ipsum ut galisum natus est suscipit totam eos voluptatem consequatur. In maxime assumenda in omnis rerum ea impedit vero ex consequatur nobis qui itaque alias ea dolor sunt. Vel voluptas laudantium ab sapiente itaque est pariatur ratione ea nemo atque et aliquam beatae?
    Qui aperiam soluta et laborum ullam ut quos facilis qui voluptatem molestiae. Et maxime quam aut temporibus amet aut quae recusandae.
    Id ullam galisum quo totam sint qui inventore quam. Et ipsam expedita quo obcaecati velit et ratione exercitationem ab odit eligendi. Sed expedita dolorem est deleniti atque aut temporibus minus. Lorem ipsum dolor sit amet. Ab tenetur sunt ut neque voluptatibus non repellendus ipsum ut galisum natus est suscipit totam eos voluptatem consequatur. In maxime assumenda in omnis rerum ea impedit vero ex consequatur nobis qui itaque alias ea dolor sunt. Vel voluptas laudantium ab sapiente itaque est pariatur ratione ea nemo atque et aliquam beatae?
    Qui aperiam soluta et laborum ullam ut quos facilis qui voluptatem molestiae. Et maxime quam aut temporibus amet aut quae recusandae.
    Id ullam galisum quo totam sint qui inventore quam. Et ipsam expedita quo obcaecati velit et ratione exercitationem ab odit eligendi. Sed expedita dolorem est deleniti atque aut temporibus minus. Lorem ipsum dolor sit amet. Ab tenetur sunt ut neque voluptatibus non repellendus ipsum ut galisum natus est suscipit totam eos voluptatem consequatur. In maxime assumenda in omnis rerum ea impedit vero ex consequatur nobis qui itaque alias ea dolor sunt. Vel voluptas laudantium ab sapiente itaque est pariatur ratione ea nemo atque et aliquam beatae?
    Qui aperiam soluta et laborum ullam ut quos facilis qui voluptatem molestiae. Et maxime quam aut temporibus amet aut quae recusandae.
    Id ullam galisum quo totam sint qui inventore quam. Et ipsam expedita quo obcaecati velit et ratione exercitationem ab odit eligendi. Sed expedita dolorem est deleniti atque aut temporibus minus. Lorem ipsum dolor sit amet. Ab tenetur sunt ut neque voluptatibus non repellendus ipsum ut galisum natus est suscipit totam eos voluptatem consequatur. In maxime assumenda in omnis rerum ea impedit vero ex consequatur nobis qui itaque alias ea dolor sunt. Vel voluptas laudantium ab sapiente itaque est pariatur ratione ea nemo atque et aliquam beatae?`,
    date: new Date(),
  },
];

let counter = news.length + 1;

app.use(express.static("public"));
app.use(express.json());

app.get("/news/:id", (req, res) => {
  const id = req.params.id;
  res.redirect(`/news-item.html?id=${id}`);
});

app.get("/api/news", (req, res) => {
  res.json({ news: news });
});

app.post("/api/news", (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ message: "News item does not have a title" });
    return;
  }

  const newsItem = {
    id: counter,
    title: req.body.title,
    content: req.body.content || "",
    date: new Date(),
  };

  counter += 1;

  news.push(newsItem);
  res.json(newsItem);
});

app.get("/api/news/:id", (req, res) => {
  const id = Number(req.params.id);

  for (const newsItem of news) {
    if (newsItem.id === id) {
      res.json(newsItem);
      return;
    }
  }
  res
    .status(404)
    .json({ message: `News item with id: ${id} could not be found` });
});

app.patch("/api/news/:id", (req, res) => {
  const id = Number(req.params.id);

  for (const newsItem of news) {
    if (newsItem.id === id) {
      if (typeof req.body.title === "string") {
        newsItem.title = req.body.title;
      }
      if (typeof req.body.content === "string") {
        newsItem.content = req.body.content;
      }
      res.json(newsItem);
      return;
    }
  }
  res
    .status(404)
    .json({ message: `News item with id: ${id} could not be found` });
});

app.delete("/api/news/:id", (req, res) => {
  const id = Number(req.params.id);

  for (let i = 0; i < news.length; i += 1) {
    const newsItem = news[i];
    if (newsItem.id === id) {
      news.splice(i, 1);
      res.json(newsItem);
      return;
    }
  }

  res
    .status(404)
    .json({ message: `News item with id: ${id} could not be found` });
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
