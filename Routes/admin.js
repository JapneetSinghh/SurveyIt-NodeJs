const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin');
router.get('/users', adminController.getAllUsers);
router.get('/userDetails/:userId', adminController.getUserDetails);
router.post('/deleteUser/:userId', adminController.deleteUser);
exports.router = router;
