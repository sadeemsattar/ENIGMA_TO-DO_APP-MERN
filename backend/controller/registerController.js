const db = require("../config/database");
const { createToken } = require("../middleware/JWT");

exports.signUp = (req, res) => {
  const { email, password, fname, img } = req.body;
  let checker = false;
  // Checking for same person
  db.query(
    "SELECT EMAIL FROM PRUSER WHERE EMAIL = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: "failed" });
      } else {
        if (result.length !== 0) {
          checker = true;
          return res.status(200).json({ message: "Exist" });
        }
      }
    }
  );
  // Adding details in DB
  if (!checker) {
    db.query(
      "INSERT INTO PRUSER(EMAIL, UPASSWORD, FNAME, UIMAGE) VALUES(?,?,?,?)",
      [email, password, fname, img],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(404).json({ message: "failed" });
        } else {
          return res.status(200).json({ message: "success" });
        }
      }
    );
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // Check for existence
  db.query(
    "SELECT * FROM PRUSER WHERE EMAIL = ? AND UPASSWORD = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: "failed" });
      } else {
        console.log("----", result);
        if (result) {
          const accessToken = createToken(email);
          res.cookie("accessToken", accessToken, {
            maxAge: 1800000, //30 min
            httpOnly: true,
          });
          console.log(accessToken);
          return res.status(200).json({ message: "success", result });
        } else {
          return res.status(404).json({ message: "failed" });
        }
      }
    }
  );
};
