const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcryptjs');


// POST 요청으로 변경
router.post('/', async (req, res) => {
  const { email, password } = req.body;  // req.body에서 id와 password 가져오기
  const selectquery = 'SELECT * FROM SIGNUP WHERE email = ?';
  const insertquery = 'INSERT INTO SIGNUP (email,password) VALUES (?, ?)';

  console.log('이메일 :',email);
  console.log('비밀번호 :',password);

  try {
    const [result] = await db.query(selectquery,[email]);
    console.log('result 값:',result);
    if (result.length > 0) {
      console.log('이미가입되어있습니다.');
      return res.status(400).json({ message: '이미 가입되어있습니다.' });
    }
    else{

      //비밀번호 해싱 
      const hashedPassword = await bcrypt.hash(password,10);
      await db.query(insertquery,[email,hashedPassword]);
      return res.status(200).json({message: '회원가입완료'});
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
