const express = require('express')

const usersRoutes = require('./users.routes')
const authUserRoutes = require('./auth.routes')

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/auth', authUserRoutes);

module.exports = router;