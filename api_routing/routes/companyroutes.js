const express = require('express');
const router = express.Router();
const companyController = require("../controllers/companycontroller")


router.get("/",companyController.getcompanyDashboard)


module.exports = router;