import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import List from './List';
import Display from './Display';
import dbData from './db.json';

import './Home.css';



const Home = () => {
    const usenavigate = useNavigate();
    const [jsonData, setJsonData] = useState([]);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [filteredData, setFilteredData] = useState([
    // data array
    ]);
    const [age, agechange] = useState("");
    const [campus, campuschange] = useState("");
    const [major, majorchange] = useState("");
    const usersData = dbData.users;

  const handleFilter = (option) => {
    setFilter(option);
    const filteredResult = jsonData.filter((item) => item.property === option);
    setFilteredData(filteredResult);
    };
    
    // Console button click handler
  const handleConsoleClick = (item) => {
    console.log(item); // Log the selected item to the console
  };

    useEffect(()=>{
        let username = sessionStorage.getItem('username'); // check if the person had logged in, cannot access the home page without login
        if (username === '' || username === null){
            usenavigate('/login');
        }

        fetch('db.json') // Assuming db.json is in the same directory as Home.js
        .then((response) => response.json())
        .then((data) => setJsonData(data))
        .catch((error) => console.error('Error fetching JSON data:', error));
    
        /*componentDidMount() {
            fetch('your-api-endpoint')
              .then(response => response.json())
              .then(data => {
                this.setState({ jsonData: data });
              })
              .catch(error => {
                console.error('Error fetching JSON data:', error);
              });
        };*/

         // Fetch data from db.json
        /*fetch('path/to/db.json')
         .then(response => response.json())
            .then(data => {
            setJsonData(data);
         })
         .catch(error => {
             console.error('Error fetching JSON data:', error);
            });
            console.log(jsonData); // Log the value of jsonData

            const filteredData = data.filter((item) => {
                // Apply filtering logic based on the selected option
                if (filter === 'option1') {
                  return item.property === 'option1';
                } else if (filter === 'option2') {
                  return item.property === 'option2';
                } else {
                  return true; // No filter applied
                }
              });*/

              const fetchData = async () => {
                try {
                  const response = await fetch('/db.json');
                  const data = await response.json();
                  setJsonData(data);
                } catch (error) {
                  console.error(error);
                }
              };
          
              fetchData();
          

    },[]);
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

      <div class="container">
            <div class="left-container">
              <img src="https://static.vecteezy.com/system/resources/previews/005/004/267/non_2x/hand-drawn-mobile-phone-chat-and-heart-symbol-for-long-distance-relationship-illustration-vector.jpg" alt="Image description" class="image2" width="370"/>
            </div>
            <div class="right-container">
              <img src="https://s.yimg.com/uu/api/res/1.2/_SwwaILifiYVUw7g0xpbIA--~B/Zmk9ZmlsbDtoPTU0NDt3PTg3NTthcHBpZD15dGFjaHlvbg--/https://o.aolcdn.com/images/dims?crop=5000%2C3105%2C0%2C324&quality=85&format=jpg&resize=1600%2C994&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-images%2F2019-02%2Fc5a6a500-3433-11e9-b7cf-e0ed95a21905&client=a1acac3e1b3290917d92&signature=95dc5aa94df6ba623681b45dd27ff05a86a5978c.cf.webp" alt="Image" class="image" width="500" />
            </div>
      </div>
            
             {/* Console buttons */}
            {data.map((item, index) => (
                 <button key={index} onClick={() => handleConsoleClick(item)}>
                    Console Button {index + 1}
                </button>
            ))}

            <div>
                <Display data={jsonData} />
            </div>
        </div>       
     );
}
 
export default Home;