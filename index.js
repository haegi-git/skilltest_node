const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes } = require("sequelize");
const cors = require("cors");

const app = express();
const port = 3000;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./todolist.sqlite",
});

class Todos extends Model {}
Todos.init(
  {
    todo: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    priority: DataTypes.INTEGER,
  },
  { sequelize, modelName: "todos" }
);

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/todo", async (req, res) => {
  const todos = await Todos.findAll();
  console.log(todos);
  res.json(todos);
});

app.post("/todo", async (req, res) => {
  const todo = await Todos.create(req.body);
  res.json(todo);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
