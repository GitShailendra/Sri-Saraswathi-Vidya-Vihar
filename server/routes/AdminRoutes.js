const express = require('express');

const router = express.Router();
const {createAdmin,login} = require('../controllers/AdminController')
router.post('/create',createAdmin);
router.post('/login',login);

module.exports   = router;