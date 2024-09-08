require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function reauthenticateToken(req, res, next) {
  console.log('Cookies:', req.cookies);
  const refreshToken = req.cookies.refreshToken; //토큰 이름 

  console.log('refreshToken from Cookie:', refreshToken);

  //토큰이 없는경우
  if (refreshToken === null) return res.status(401).json({ message: '토큰이 필요합니다.' });

  //토큰이 만료되었거나 유효하지않는경우 여기서 err가 뜸 
  jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: '유효하지 않은 리프레쉬 토큰입니다.' });
    req.user = user; 
    next(); 
  });
}

module.exports = reauthenticateToken;
