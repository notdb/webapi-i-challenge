// implement your API here

const express = require("express");
const dbAccess = require("./data/db.js");

const server = express();

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

server.listen(8000, () => console.log("API running on port 8000"));
