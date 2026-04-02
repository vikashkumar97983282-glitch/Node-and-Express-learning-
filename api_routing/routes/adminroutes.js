const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admincontroller")


router.get("/dashboard",adminController.getadminDashboard);


module.exports = router;