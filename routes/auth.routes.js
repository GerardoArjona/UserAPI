const express = require('express')
const users = require('../controllers/users.controllers');

const router = express.Router();

router.post('/signin', users.signin); //Update User

router.get('/signout', users.signout); //Delete user

module.exports = router