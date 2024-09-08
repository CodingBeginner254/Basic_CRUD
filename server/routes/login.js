require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const redisClient = require('../redisClient');

router.post('/', async (req, res) => {
  const { id, password } = req.body;  
  const query = 'SELECT * FROM SIGNUP WHERE email = ?';

  try {
    const [rows] = await db.query(query, id);
    if (rows.length === 0) {
      return res.status(400).json({ message: '가입되어있지않습니다.' });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password,user.password);
 
    if(!isMatch){
      console.log('비밀번호가 맞지 않습니다.');
      return res.status(400).json({message: '비밀번호가 맞지 않습니다.'});
    }

    const Token = jwt.sign(
      { 
        type: "JWT",
        id: user.id 
      }, 
      JWT_SECRET, 
      { 
        expiresIn: '3m',
        algorithm: 'HS256' 
      } 
    );
    res.cookie('Token', Token ,{
      httpOnly : true,
      sameSite: 'strict'
    });

    const refreshToken = jwt.sign(
      {
        type: "JWT",
        id:user.id
      },
      JWT_SECRET,
      {
        expiresIn: '5m',
        algorithm: 'HS256'
      }
    );

     // Redis에 refresh token 저장
     await redisClient.set(toString(user.id), refreshToken, "EX", 30);



    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      //secure: true, // HTTPS 환경에서만 전송
      sameSite: 'Strict'
    });

    res.status(200).json({message: 'Login successfully!' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
