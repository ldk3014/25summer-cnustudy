const express = require("express");
const app = express();

//아직 데이터베이스 없으므로 포스트에 빈 리스트를 할당합니다.
let posts = [];

//express.json() 미들웨어 활성화.
app.use(express.json());

// post요청이 application/x-www-form-urlencoded 인 경우 파싱해줍니다. 
// POST 요청은 대부분 application/x-www-form-urlencoded 타입이라 express.json()과 함께 사용합니다.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //게시판에 리스트를 JSON 형식으로 보여줍니다.  
  res.json(posts);
});

app.post("/posts", (req, res) => {
  console.log(typeof req.body);
  //비구조화 할당 destructing assignment
  const { title, name, text } = req.body;
  posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() });
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  const id = +req.params.id; // string -> number
  const newPosts = posts.filter(post => post.id !== id);
  
  if (newPosts.length === posts.length) {
    return res.status(404).json({ error: "해당 ID의 게시글이 업슴." });
  }

  posts = newPosts;
  res.json({ message: `${id}번 게시글이 삭제됨.` });
});


app.listen(3000, () => {
  console.log("게시판!");
});
