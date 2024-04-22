console.clear();
import {} from "http";
import ExpressServer from "express";
import authRouter from "./Routes/auth.js";
import cors from "cors";
import postsRouter from "./Routes/Posts.js";
import bodyParser from "body-parser";

const PORT = 3000;
const app = ExpressServer();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

export const users = [
  {
    Uuid: "1c51596b-21fc-419b-afaa-6485fa42b44b",
    Carne: "12024",
    Name: "David Augusto",
    LastName: "Maldonado Hurtarte",
    Faculty: "ingenieria",
    Career: "Ingenieria en Ciencieas y Sistemas",
    Email: "ipc11s2024@gmail.com",
    Password: "@dminIPC1",
    Role: "admin",
  },
];

export const posts = [
  {
    Uuid: "1c51596b-21fc-419b-afaa-6485fa42b44b",
    tweet: "Hola Mundo",
    hashtags: ["#hola", "#mundo"],
    image: null,
    comments: [],
    date: new Date().toISOString(),
    User: "uuid",
    likes: 0,
    commnetsNumber: 0,
    anonymous: false,
    likedBy: [],
  },
];

app.use(cors());
app.use(ExpressServer.json());
app.use(authRouter);
app.use(postsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
