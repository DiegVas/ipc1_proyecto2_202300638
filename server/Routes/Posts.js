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
  posts.push({ ...req.body, Uuid: Uuid });
  console.log(posts);
  return res.status(200).json({ ...req.body, Uuid: Uuid });
});

postRouter.delete("/posts/:Uuid", (req, res) => {});

export default postRouter;
