// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  getUsers,
  findUserById,
  removeUser,
  addUser,
} from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// const findUserByName = (name) => {
//   return users["users_list"].filter((user) => user["name"] === name);
// };

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  getUsers(name, job)
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(`Failed to find: ${err}`));
  // } else {
  //   findUserByName(name)
  //     .then((result) => res.send(result))
  //     .catch((err) => res.status(404).send(`Failed to find: ${err}`));
  //   //result = { users_list: result };
});

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  findUserById(id)
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(`Failed to find: ${err}`));
});

// const findUserByNameAndJob = (name, job) =>
//   users["users_list"]
//     .filter((user) => user["name"] === name)
//     .filter((user) => user["job"] === job);

// const deleteUserById = (user) => {
//   let x = 0;
//   for (let x = 0; x < users["users_list"].length; x++) {
//     if (users["users_list"][x].id == user.id) {
//       users["users_list"].splice(x, 1);
//       break;
//     }
//   }
// };
app.delete("/users", (req, res) => {
  const user = req.body;
  removeUser(user.id)
    .then(res.status(204).send())
    .catch((err) => res.status(404).send(`Failed to delete: ${err}`));
});

// const addUser = (user) => {
//   user.id = (Math.random() * 100000).toFixed(0);
//   users["users_list"].push(user);
//   return user;
// };

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => res.status(404).send(`Failed to add: ${err}`));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor",
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer",
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor",
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress",
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender",
//     },
//   ],
// };
