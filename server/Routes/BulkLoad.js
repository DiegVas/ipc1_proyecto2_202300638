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
    Role: "user",
    Posts: 0,
    Comments: 0,
  }));
  users.push(...newUsers);
  console.log(users);
  return res.status(200).send({ message: "Usuarios cargados exitosamente" });
});

BoukLoadRouter.post("/Postmass-upload", (req, res) => {
  const newPosts = req.body.map((post) => {
    users.find((user) => user.Carne == post.codigo.toString()).Posts++;
    return {
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
    };
  });

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
    contrasenia: user.Password,
    posts: user.Posts,
    comentarios: user.Comments,
  }));
  console.log(data);
  return res.json(data);
});

BoukLoadRouter.delete("/deleteuser/:codigo", (req, res) => {
  const codigo = req.params.codigo;
  const index = users.findIndex((user) => user.Carne === codigo);

  if (index !== -1) {
    users.splice(index, 1);
    return res.status(200).send({ message: "Usuario eliminado exitosamente" });
  } else {
    return res.status(404).send({ message: "Usuario no encontrado" });
  }
});

BoukLoadRouter.get("/getposts", (req, res) => {
  const data = posts.map((post) => ({
    codigo: post.carne,
    descripcion: post.tweet,
    categoria: post.hashtags[0],
    anonimo: post.anonymous,
    uuid: post.Uuid,
    imagen: post.image,
    comentarios: post.comments,
    fecha: post.date,
    usuario: post.User,
    likes: post.likes,
    numeroComentarios: post.commnetsNumber,
    gustadoPor: post.likedBy,
  }));
  return res.json(data);
});

BoukLoadRouter.delete("/deletepost/:codigo", (req, res) => {
  console.log(req.params);
  const carne = req.params.codigo;
  console.log(carne);
  const index = posts.findIndex((post) => post.carne === carne);

  if (index !== -1) {
    posts.splice(index, 1);
    return res.status(200).send({ message: "Post eliminado exitosamente" });
  } else {
    return res.status(404).send({ message: "Post no encontrado" });
  }
});

export default BoukLoadRouter;
