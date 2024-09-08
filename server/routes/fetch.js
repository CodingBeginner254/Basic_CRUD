const express = require('express');
const router = express.Router();
const db = require('../models/db');

// 비동기 처리를 위해 async를 사용하는 라우트 핸들러
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM topic;';
  
  try {
    // 프로미스 기반 API를 사용하여 쿼리 실행
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
