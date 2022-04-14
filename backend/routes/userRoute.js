const express = require("express");
const router = express.Router();

const {
    //viewCard, , viewMemberBoard, addBoard, addCard, addMemberBoard
    viewBoard,
    addBoard,
    viewMemberBoard,
    addMemberBoard
} = require("../controller/userController");

router.route("/board")
    .post(addBoard)
    .get(viewBoard)


router.route("/memberBoard")
    .get(viewMemberBoard)
    .post(addMemberBoard);

// router.route("/cards")
//     .get(viewCard)
//     .post(addCard);

module.exports = router;
