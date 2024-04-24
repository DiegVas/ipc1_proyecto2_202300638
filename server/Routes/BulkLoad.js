import { posts, users } from "../index.js";
import express from "express";
import { v4 } from "uuid";

const BoukLoadRouter = express.Router();
BoukLoadRouter.use(express.json());

BoukLoadRouter.post("/Usermass-upload", (req, res) => {
  const newUsers = req.body.map((user) => ({
    Uuid: v4(),
    Carne: user.codigo.toString(),
    Name: user.nombres,
    LastName: user.apellidos,
    Faculty: user.facultad,
    Career: user.carrera,
    Email: user.correo,
    Password: user.contrasenia,
    Gender: user.genero == "M" ? "Masculino" : "Femenino",
  }));
  users.push(...newUsers);
  console.log(users);
  return res.status(200).send({ message: "Usuarios cargados exitosamente" });
});

BoukLoadRouter.post("/Postmass-upload", (req, res) => {
  const newPosts = req.body.map((post) => ({
    Uuid: v4(),
    tweet: post.descripcion,
    hashtags: [post.categoria],
    carne: post.codigo.toString(),
    image: null,
    comments: [],
    date: new Date().toISOString(),
    User: "uuid",
    likes: 0,
    commnetsNumber: 0,
    anonymous: post.anonimo,
    likedBy: [],
  }));

  posts.push(...newPosts);
  console.log(posts);

  return res.status(200).send({ message: "Posts cargados exitosamente" });
});

BoukLoadRouter.get("/getusers", (req, res) => {
  const data = users.map((user) => ({
    codigo: user.Carne,
    nombres: user.Name,
    apellidos: user.LastName,
    facultad: user.Faculty,
    carrera: user.Career,
    correo: user.Email,
    genero: user.Gender == "Masculino" ? "M" : "F",
  }));
  res.json(data);
});

BoukLoadRouter.get("/getposts", (req, res) => {
  const data = posts.map((post) => ({
    codigo: post.carne,
    descripcion: post.tweet,
    categoria: post.hashtags[0],
    anonimo: post.anonymous,
  }));
  res.json(data);
});

export default BoukLoadRouter;
