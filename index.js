const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const sqlite3 = require("sqlite3").verbose(); // sqlite3 임포트

const db = new sqlite3.Database("./todolist.db"); // 데이터베이스 파일

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS todolist (" +
      "id INTEGER, " +
      "todo TEXT NOT NULL," +
      "complete INTEGER," +
      "priority INTEGER," +
      "PRIMARY KEY(id AUTOINCREMENT)" +
      ")"
  );

  const stmt = db.prepare(
    "INSERT INTO todolist (todo, complete, priority) VALUES (?, ?, ?)"
  );

  const todoItems = [
    { todo: "똥싸기", complete: 0, priority: 0 },
    { todo: "손씻기", complete: 0, priority: 0 },
    { todo: "양치하기", complete: 0, priority: 0 },
  ];

  for (let todoItem of todoItems) {
    stmt.run(todoItem.todo, todoItem.complete, todoItem.priority);
  }

  stmt.finalize();

  db.each(
    "SELECT rowid AS id, todo, complete, priority FROM todolist",
    (err, row) => {
      console.log(`${row.id}, ${row.todo}`);
    }
  );
});
db.close();
// Data Types
// NULL, INTEGER : 정수값, REAL : 부동소수점 저장(일반적으로 실수),
// TEXT : 텍스트데이터, BLOB : 이미지 비디오 등등

// Boolean은 정수로 1과 0으로 구분

app.get("/", (req, res) => {
  res.send();
});
