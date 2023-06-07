import { Link, useNavigate } from 'react-router-dom';
import Display from './Display';

import './Home.css';


const Home = () => {    

    return ( 
        <div
        
            style={{
                backgroundColor: 'lightblue',
                padding: '20px',
                minHeight: '100vh',
            }}>

            <div className="header">
                <Link style={{float:'left'}} to={'/profile'}>Your Profile</Link>
                <Link style={{float:'right'}} to={'/'}>Logout</Link>
                <p></p>
            </div>

            <h1 style={{ color: 'yellow' }} className="text-center moving-text">Welcome to MatchU</h1>

      <div className="container">
            <div className="left-container">
              <img src="https://static.vecteezy.com/system/resources/previews/005/004/267/non_2x/hand-drawn-mobile-phone-chat-and-heart-symbol-for-long-distance-relationship-illustration-vector.jpg" alt="Image description" className="image2" width="370"/>
            </div>
            <div className="right-container">
              <img src="https://s.yimg.com/uu/api/res/1.2/_SwwaILifiYVUw7g0xpbIA--~B/Zmk9ZmlsbDtoPTU0NDt3PTg3NTthcHBpZD15dGFjaHlvbg--/https://o.aolcdn.com/images/dims?crop=5000%2C3105%2C0%2C324&quality=85&format=jpg&resize=1600%2C994&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-images%2F2019-02%2Fc5a6a500-3433-11e9-b7cf-e0ed95a21905&client=a1acac3e1b3290917d92&signature=95dc5aa94df6ba623681b45dd27ff05a86a5978c.cf.webp" alt="Image" className="image" width="500" />
            </div>
      </div>

            <div>
                <Display/>
            </div>
        </div>       
     );
}
 
export default Home;