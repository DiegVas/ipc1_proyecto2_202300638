import { users } from "../index.js";
import express from "express";
import { v4 } from "uuid";
import { posts } from "../index.js";

const authRouter = express.Router();
authRouter.use(express.json());

//Autenficar un usuario
authRouter.post("/auth/login", (req, res) => {
  console.clear();
  console.log(users);

  const { Carne, Password } = req.body;
  if (!Carne || Carne == "" || !Password || Password == "") {
    return res.status(400).send();
  }

  const user = users.find((user) => user.Carne === Carne);
  console.log(user);
  if (!user) {
    return res.status(404).send();
  }

  if (user.Password !== Password) {
    return res.status(409).send();
  }

  return res.status(200).json(user);
});

//Crear un usuario
authRouter.post("/auth/signUp", (req, res) => {
  console.clear();
  console.log(users);

  const { Carne, Email } = req.body;
  if (!Carne || Carne == "" || !Email || Email == "") {
    return res.status(400).send();
  }

  const listCarne = users.filter((user) => user.Carne === Carne);
  const listEmail = users.filter((user) => user.Email === Email);
  if (listCarne.length) {
    return res.status(404).send();
  }
  if (listEmail.length) {
    return res.status(409).send();
  }
  const Uuid = v4();
  users.push({ ...req.body, Uuid: Uuid, Role: "user", Posts: 0, Comments: 0 });
  return res.status(200).json({ ...req.body, Uuid: Uuid });
});

authRouter.delete("/auth/:Uuid", (req, res) => {
  const { Uid } = req.body;
  if (!Uid || Uid == "") {
    return res.status(400).send();
  }
  const userIndex = users.findIndex((user) => user.Uid === Uid);
  if (userIndex === -1) {
    return res.status(404).send();
  }
  users.splice(userIndex, 1);
  return res.status(200).send();
});

authRouter.put("/auth/:Uuid", (req, res) => {
  console.clear();
  const { Uuid } = req.params;
  const updates = req.body;

  if (!Uuid || Uuid == "") {
    return res.status(400).send();
  }

  const user = users.find((user) => user.Uuid === Uuid);
  if (!user) {
    return res.status(404).send();
  }

  posts.forEach((post) => {
    post.comments.forEach((comment) => {
      console.log("Goa");
      if (comment.username == user.Name) {
        comment.username = updates.Name;
        console.log(updates.Name);
      }
    });
  });

  console.log(posts);
  Object.assign(user, updates);
  return res.status(200).json(user);
});

export default authRouter;
