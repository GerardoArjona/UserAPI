const express = require('express')
const users = require('../controllers/users.controllers');

const router = express.Router();

router.post('/', users.signUp); //Create User

router.get('/', users.listUsers); //Get All User

router.get('/:userId', users.findOne); //Get User by Id

router.put('/:userId', users.update); //Update User

router.delete('/:userId', users.deleteUser); //Delete user

module.exports = router