import { posts, users } from "../index.js";
import express from "express";
import { v4 } from "uuid";

const postRouter = express.Router();
postRouter.use(express.json());
postRouter.get("/posts", (req, res) => {
  return res.status(200).json(posts);
});

postRouter.post("/posts", (req, res) => {
  console.log(req.body);
  console.clear();

  const { tweet } = req.body;
  if (!tweet) {
    return res.status(400).send();
  }

  const Uuid = v4();
  users.find((user) => user.Carne === req.body.carne).Posts++;
  posts.push({ ...req.body, Uuid: Uuid });
  console.log(posts);
  return res.status(200).json({ ...req.body, Uuid: Uuid });
});

postRouter.post("/posts/:Uuid/like", (req, res) => {
  console.clear();
  const { Uuid } = req.params;
  const post = posts.find((post) => post.Uuid === Uuid);
  if (!post) return res.status(404).send();

  if (!req.body.liked) {
    post.likedBy.push(req.body.userUuid);
    post.likes = post.likes + 1;
  } else {
    const index = post.likedBy.indexOf(req.body.userUuid);
    if (index > -1) {
      post.likedBy.splice(index, 1);
      post.likes = post.likes - 1;
    }
  }
  console.log(posts);
  return res.status(200).json(post);
});

postRouter.post("/posts/:Uuid/comments", (req, res) => {
  const { Uuid } = req.params;
  const post = posts.find((post) => post.Uuid === Uuid);
  if (!post) return res.status(404).send();
  users.find((user) => user.Carne === req.body.carne).Comments++;
  post.comments.push(req.body);
  post.commentsNumber = post.commnetsNumber + 1;

  console.log(posts);
  return res.status(200).json(post);
});

postRouter.delete("/posts/:Uuid", (req, res) => {});

export default postRouter;
