import { ProfileItem, RefreshAccessToken } from '../api';
import { useEffect,useCallback,useState} from 'react';
const Profiles = () => {

  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false); // 토큰 갱신 여부 상태 관리
  const [shouldRetry, setShouldRetry] = useState(true); // 추가된 상태

  const handleSubmit = useCallback(async () => {
    try {
      const data = await ProfileItem();
      console.log('data:',data); 
    }catch (error) {
      console.error("Error during signup:", error); 

      if(error.response.status === 403 && !isTokenRefreshed){
        await RefreshAccessToken();
        setIsTokenRefreshed(true);
        setShouldRetry(false); 
      }
    }
  },[isTokenRefreshed]);

  useEffect(() => {
    if(shouldRetry){
      handleSubmit(); 
    }
  }, [handleSubmit,shouldRetry]); 


  return (
    <div>
     <p>Profile data will be logged to the console.</p>
    </div>
  );
}
export default Profiles;