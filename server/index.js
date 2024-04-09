console.clear();
import {} from "http";
import ExpressServer from "express";
import authRouter from "./Routes/auth.js";

const PORT = 3000;
const app = ExpressServer();

export const users = [
  {
    uid: "1c51596b-21fc-419b-afaa-6485fa42b44b",
    carne: "12024",
    name: "David Augusto",
    lastName: "Maldonado Hurtarte",
    faculty: "ingenieria",
    career: "Ingenieria en Ciencieas y Sistemas",
    email: "ipc11s2024@gmail.com",
    password: "@dminIPC1",
    role: "admin",
  },
];
export const posts = [];

app.use(ExpressServer.json());
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
