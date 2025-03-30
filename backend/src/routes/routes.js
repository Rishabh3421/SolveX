const express = require("express");
const aiController = require("../controller/controller");
const verifyUser = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/get-review", verifyUser, aiController.getReview);
module.exports = router;
