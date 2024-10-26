import express from "express"
import bodyParser from "body-parser"

const port = 3000;
const app = express();

var articles = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { articles });
});

app.post("/add", (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const text = req.body.content;

  articles.push({
    title: title,
    date: date,
    text: text
  });

  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  articles.splice(index, 1);

  res.redirect("/")
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    
    res.render("edit.ejs", { articles: articles[index], index})
});

app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    
    articles[index] = {
      title: req.body.title,
      date: req.body.date,
      text: req.body.content
    }

    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});