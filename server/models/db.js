// server/models/db.js
require('dotenv').config();
const mysql = require('mysql2');

// MySQL 데이터베이스 연결 풀 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // 풀에서 유지할 최대 연결 수
  queueLimit: 0 // 대기 큐의 최대 크기 (0은 무제한)
});

// 연결 풀을 프로미스로 래핑하여 사용
const promisePool = pool.promise();

module.exports = promisePool;
