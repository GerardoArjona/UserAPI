const express = require('express')
const users = require('../controllers/users.controllers');

const { authenticationMiddleware } = require('../middleware/authenticateToken')


const router = express.Router();

router.post('/', users.signUp); //Create User

router.get('/', users.listUsers); //Get All User

router.get('/byUsername/:username', authenticationMiddleware, users.findOneByUsername); //Get Username

router.put('/:userId', authenticationMiddleware, users.update); //Update User

router.delete('/:userId', authenticationMiddleware, users.deleteUser); //Delete user

module.exports = router