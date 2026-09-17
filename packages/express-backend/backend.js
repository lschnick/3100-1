// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    if (job != undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
    } else {
      let result = findUserByName(name);
      result = { users_list: result };

      res.send(result);
    }
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const findUserByNameAndJob = (name, job) =>
  users["users_list"]
    .filter((user) => user["name"] === name)
    .filter((user) => user["job"] === job);

const deleteUserById = (user) => {
  let x = 0;
  for (let x = 0; x < users["users_list"].length; x++) {
    if (users["users_list"][x].id == user.id) {
      users["users_list"].splice(x, 1);
      break;
    }
  }
};
app.delete("/users", (req, res) => {
  const user = req.body;
  deleteUserById(user);
  res.status(204).send();
});

const addUser = (user) => {
  user.id = (Math.random() * 100000).toFixed(0);
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};
