// redisClient.js
const redis = require('redis');
const client = redis.createClient({
  url: 'redis://localhost:6379' // Redis 서버의 URL
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.connect();

module.exports = client;
