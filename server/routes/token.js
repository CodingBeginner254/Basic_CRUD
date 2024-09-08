require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const redisClient = require('../redisClient');
const reauthenticationToken = require('./reauthenticationToken');
// Refresh Token을 통한 Access Token 갱신
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/',reauthenticationToken, async (req, res) => {
  console.log('refreshtoken 실행');
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token이 필요합니다.' });
  }

  try {
    // Redis에서 Refresh Token 가져오기
    console.log(`req.user.id 값 ${req.user.id}`);
    const storedToken = await redisClient.get(toString(req.user.id));

    if (refreshToken !== storedToken) {
      return res.status(403).json({ message: 'Refresh Token이 유효하지 않습니다.' });
    }

    // Refresh Token 검증
    jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Refresh Token이 만료되었습니다.' });

      // 새로운 Access Token 발급
      const Token = jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: '3m' }
      );

      res.cookie('Token', Token, {
        httpOnly: true,
        //secure: true,
        sameSite: 'Strict'
      });

      res.status(200).json({ message: 'Access Token이 갱신되었습니다.' });
    });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;