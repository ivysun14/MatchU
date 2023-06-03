import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
//import './Home.css'; // Import CSS file for styling
import List from './List';
import Display from './Display';
import dbData from './db.json';




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
                <Link to={'/'}>Home</Link>
                <Link style={{float:'right'}} to={'/login'}>Logout</Link>

            </div>
            <h1 className="text-center">Welcome to MatchU</h1>

            

             {/* Console buttons */}
            {data.map((item, index) => (
                 <button key={index} onClick={() => handleConsoleClick(item)}>
                    Console Button {index + 1}
                </button>
            ))}

            {/* Rest of your component code */}

            <div>
              {/* Other components and content */}
                <Display data={jsonData} />
            </div>
        </div>       
     );
}
 
export default Home;