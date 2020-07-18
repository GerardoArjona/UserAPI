const express = require('express')
const users = require('../controllers/users.controller.js');

const router = express.Router();

router.post('/login', users.login);
router.get('/', users.listUsers);
router.post('/signup', users.signUp);
router.put('/:userId', users.update);
router.delete('/:userId', users.deleteUser);