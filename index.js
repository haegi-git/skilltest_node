const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
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
    priority: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  { sequelize, modelName: "todos" }
);

class Users extends Model {}
Users.init(
  {
    user: DataTypes.STRING,
    tag: DataTypes.NUMBER,
  },
  { sequelize, modelName: "users" }
);

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// user
app.post("/user", async (req, res) => {
  const { user, tag } = req.body;

  Users.findOne({
    where: {
      user,
      tag,
    },
  }) // response에 req.body와 일치하는 유저정보가 들어있음
    .then((response) => {
      if (response === null) {
        // 유저정보가 없으면 새로 생성
        // 이미 비동기함수 내의 then 내부라 await이 안먹음
        // 그래서 Users.create가 성공하면? 이라는 상태의 .then을 다시사용
        Users.create(req.body).then((user) => {
          res.status(200).json({
            statusCode: 200,
            message: "중복 없음",
            user: user,
            // 유저 정보 넘겨줌 id값을 위해 (id값은 자동생성)
          });
        });
      } else {
        // 유저정보가 있으면 중복 확인 후 유저정보 메세지로 넘겨줌
        // 로그인 대신 중복 정보로 통과시킨 후 todo 불러오기
        res.status(409).json({
          statusCode: 409,
          message: response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        ...err,
        statusCode: 500,
        message: "실패!",
      });
    });
});

//todo

// 해당 유저 id가 일치하는 todo get
app.get("/todo/:userId", async (req, res) => {
  //  모든 데이터 가져오는거 (모든 유저 싹다다)
  // const todos = await Todos.findAll();
  // res.json(todos);

  const { userId } = req.params;

  Todos.findAll({
    where: {
      userId,
    },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/:userId/:search", async (req, res) => {
  const { userId, search } = req.params;
  Todos.findAll({
    where: {
      userId,
      todo: { [Op.like]: `%${search}%` },
    },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// todo 생성 post

app.post("/todo", async (req, res) => {
  const todo = await Todos.create(req.body);
  res.json(todo);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// todo 삭제 delete
app.delete("/todo/:id", async (req, res) => {
  const todo = await Todos.findByPk(req.params.id);
  if (todo) {
    await todo.destroy();
    res.json({ message: "todo 삭제됨" });
  } else {
    res.status(404).json({ message: "해당 todo 없음" });
  }
});

// todo 수정 put

app.put("/todo/:id", async (req, res) => {
  const todo = await Todos.findByPk(req.params.id);
  if (todo) {
    await todo.update(req.body);
    res.json(todo);
  } else {
    res.status(404).json({ message: "에러!" });
  }
});
