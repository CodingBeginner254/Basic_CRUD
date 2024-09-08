import {useState} from 'react';
import { LoginItem } from '../api';
const Login = () => {
  const [id, setId] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const IdPassword = {id,password};
    try {
      const data = await LoginItem(IdPassword);
      console.log(data); 
    }catch (error) {
      console.error("Error during signup:", error); 
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder = "ID를 입력하세요"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password를 입력하세요'
          required
        />
        <button type="submit">Login</button>
        
        </form>
    </div>
  );
}
export default Login;