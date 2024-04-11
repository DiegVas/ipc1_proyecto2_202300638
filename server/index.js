console.clear();
import {} from "http";
import ExpressServer from "express";
import authRouter from "./Routes/auth.js";
import cors from "cors";

const PORT = 3000;
const app = ExpressServer();

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

console.log(users);

export const posts = [];

app.use(cors());
app.use(ExpressServer.json());
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
