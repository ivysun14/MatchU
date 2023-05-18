import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Home = () => {
    
    const usenavigate = useNavigate();
    useEffect(()=>{
        let username = sessionStorage.getItem('username'); // check if the person had logged in, cannot access the home page without login
        if (username === '' || username === null){
            usenavigate('/login');
        }
    },[])
    return ( 
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                <Link style={{float:'right'}} to={'/login'}>Logout</Link>

            </div>
            <h1 className="text-center">Welcome to MatchU</h1>
        </div>
     );
}
 
export default Home;