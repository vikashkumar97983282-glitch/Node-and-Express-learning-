const express = require('express');
const router = express.Router();
const companyController = require("../controllers/companycontroller")


router.get("/dashboard",companyController.getcompanyDashboard)


module.exports = router;