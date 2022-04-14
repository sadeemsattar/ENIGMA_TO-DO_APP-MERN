const db = require("../config/database");

const jwt = require("jsonwebtoken");

exports.addBoard = (req, res) => {
  const data = req.email;
  const { title, description } = req.body;
  db.query(
    "INSERT INTO BOARD(EMAIL, TITLE, BDESCRIPTION) VALUES(?,?,?)",
    [data, title, description],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "failed" });
      } else {
        return res.status(200).json({ message: "success" });
      }
    }
  );
};

exports.viewBoard = (req, res) => {
  const data = req.email;
  console.log(data);
  // const { title, description } = req.body;
  db.query("SELECT * FROM BOARD WHERE EMAIL = ?", [data], (err, result) => {
    if (err) {
      return res.status(403).json({ message: "failed" });
    } else {
      //   if (typeof localStorage === "undefined" || localStorage === null) {
      //     // var LocalStorage = require('node-localstorage').LocalStorage;
      //     // localStorage = new LocalStorage('./scratch');
      //   }
      //   // console.log(result[0].BID)
      //   //   localStorage.setItem("BOARDID", `${result[0].BID}`);
      return res.status(200).json({ message: "success", result });
    }
  });
};

exports.viewMemberBoard = (req, res) => {
  // Fetching Emails
  db.query("SELECT * FROM PRUSER", (err, result) => {
    if (err) {
      return res.status(403).json({ message: "failed" });
    } else {
      return res.status(200).json({ message: "success", result });
    }
  });
};

exports.addMemberBoard = (req, res) => {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
  const BoardID = localStorage.getItem("BOARDID");
  const { userEmail } = req.body;
  db.query(
    "INSERT INTO MEMBERBOARD(MEMAIL, BID) VALUES(?,?)",
    [userEmail, parseInt(BoardID)],
    (err, result) => {
      if (err) {
        return res.status(403).json({ message: "failed" });
      } else {
        return res.status(200).json({ message: "success", result });
      }
    }
  );
};
