const express = require('express');
const router = express.Router();
const userController = require("../controller/usercontroller")


router.get("/home",userController.getUser);

router.get("/adduser",userController.addUser)


module.exports = router;