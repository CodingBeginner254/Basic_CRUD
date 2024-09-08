import {useState} from 'react';
import { SigninItem } from '../api';
const Signin = () => {
  const [email, setId] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPassword = {email,password};
    try {
      const data = await SigninItem(emailPassword);
      console.log(data); 
    }catch (error) {
      console.error("Error during signup:", error); 
    }
  }

  return (
    <div>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
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
        <button type="submit">Signin</button>
        
        </form>
    </div>
  );
}
export default Signin;