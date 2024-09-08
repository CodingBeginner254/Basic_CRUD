const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', async (req,res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const query = 'INSERT INTO topic (title,description) VALUES (?,?)';
  const values = [title,description];
  try{
    const [result] = await db.query(query, values);
    const newItem = { id: result.insertId, title, description };  // 추가된 항목의 ID와 데이터를 포함한 객체 생성
    res.status(201).json(newItem);  // 이 객체를 클라이언트로 반환
  }catch(error){
    console.error('Error Adding data:',error);
    res.status(500).json({message: 'Server Error'},error);
  }
});

module.exports = router;