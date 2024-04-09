import { users } from "../index.js";
import express from "express";

const authRouter = express.Router();
authRouter.use(express.json());

//Autenficar un usuario
authRouter.get("/auth/login", (req, res) => {
  console.clear();
  console.log(users);

  const { carne, password } = req.body;
  if (!carne || !password) return res.status(400).send();

  const user = users.find((user) => user.carne === carne);
  if (!user) return res.status(404).send();

  if (user.password !== req.body.password) return res.status(409).send();

  res.send(`Usuario ${user.name} autenticado`);
});

//Crear un usuario
authRouter.post("/auth/signUp", (req, res) => {
  console.clear();
  console.log(users);

  const { carne, email } = req.body;
  if (!carne || !email) return res.status(400).send();
  const listCarne = users.filter((user) => user.carne === carne);
  const listEmail = users.filter((user) => user.email === email);
  if (listCarne.length || listEmail.length) return res.status(409).send();
  users.push(req.body);
  console.log(users);
  res.send("Usuario creado");
});

export default authRouter;
