// implement your API here

const express = require("express");
const dbAccess = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/api/users", (req, res) => {
  dbAccess
    .find()
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
});

server.get("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  dbAccess
    .findById(userID)
    .then(user => res.json(user))
    .catch(err => res.status(500).send(err));
});

server.delete("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  dbAccess
    .remove(userID)
    .then(user => res.json(user) && res.send(`${userID} removed`))
    .catch(err => res.status(500).send(err));
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  dbAccess
    .insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).send(err));
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const userBody = req.body;
  dbAccess
    .update(id, userBody)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ err: "incorrect id" });
      }
    })
    .catch(err => res.status(500).send(err));
});

server.listen(8000, () => console.log("API running on port 8000"));
