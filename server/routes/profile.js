const express = require('express');
const router = express.Router();
const authenticateToken = require('./authenticateToken');

router.get('/', authenticateToken, (req, res) => {
  res.json({ message: `Hello, user ${req.user.id}` });
});

module.exports = router;
