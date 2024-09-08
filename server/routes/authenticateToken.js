require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  console.log('authCookies:', req.cookies);
  const Token = req.cookies.Token; //토큰 이름 

  console.log('Token from Cookie:', Token);

  //토큰이 없는경우
  if (Token === null) return res.status(401).json({ message: '토큰이 필요합니다.' });

  //토큰이 만료되었거나 유효하지않는경우 여기서 err가 뜸 
  jwt.verify(Token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: '유효하지 않은 엑세스토큰입니다.' });
    req.user = user; 
    next(); 
  });
}

module.exports = authenticateToken;
