const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const fetchRoutes = require('./routes/fetch');
const addRoutes = require('./routes/add');
const updateRoutes = require('./routes/update');
const deleteRoutes = require('./routes/delete');
const loginRouters = require('./routes/login');
const signinRouters = require('./routes/signin');
const profileRouters = require('./routes/profile');

const refreshtokenRounters = require('./routes/token');

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors({
  origin: 'http://localhost:5173', // 클라이언트의 도메인
  credentials: true // 쿠키를 사용할 수 있도록 설정
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/items',fetchRoutes);
app.use('/items',addRoutes);
app.use('/items',updateRoutes);
app.use('/items',deleteRoutes);
app.use('/login',loginRouters);
app.use('/signin',signinRouters);
app.use('/profile',profileRouters);
app.use('/token',refreshtokenRounters);


app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});