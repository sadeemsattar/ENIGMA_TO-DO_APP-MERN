const db = require("../config/database");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/JWT");
const mysql = require("mysql2")



 
//         const accessToken = createToken(id, loginAs);

//         res.cookie("accessToken", accessToken, {
//           maxAge: 1800000, //30 min
//           httpOnly: true,
//         });
//         // res.header("Access-Control-Allow-Credentials", true);
//         // /res.header("Access-Control-Allow-origin", true);

//         res
//           .status(200)
//           .json({ status: "success", message: "successfully logged in" });
//       });

//       // json({ status: "success", adminId: userName });
//     } else {
//       res
//         .status(401)
//         .json({ status: "failed", message: "Invalid credentials.Try again" });
//     }
//   });
//   // db.end;
// };
