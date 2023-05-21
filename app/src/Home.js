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

            <h4>Find your matching!</h4>
            

            <div style={{ display: 'inline-block', border: '5px solid #ccc', padding: '10px', backgroundColor: 'white' }}>
            <h7>You can use a filter down here:</h7>
            
            
            {/*Filter button */}
            <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Age<span className="errormsg"></span></label>
                                        <select 
                                        value={age}
                                        onChange={e => agechange(e.target.value)}
                                        className="form-control"
                                        style={{ width: '40px', height: '20px', fontSize: '14px'}}
                                      >
                                            <option>    </option>
                                            <option value="18-22">18-22</option>
                                            <option value="23-25">23-25</option>
                                            <option value="26-30+">26-30+</option>
                                        </select>
                                    </div>
                                </div>
            <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Campus<span className="errormsg"></span></label>
                                        <select 
                                        value={campus}
                                        onChange={e => campus(e.target.value)}
                                        className="form-control"
                                        style={{ width: '80px', height: '20px', fontSize: '14px' }}
                                      >
                                            <option>    </option>
                                            <option value="UCLA">UCLA</option>
                                            <option value="UC Berkeley">UC Berkeley</option>
                                            <option value="UC Davis">UC Davis</option>
                                            <option value="UC Riverside">UC Riverside</option>
                                            <option value="UC Irvine">UC Irvine</option>
                                            <option value="UC Merced">UC Merced</option>
                                            <option value="UC San Diego">UC San Diego</option>
                                            <option value="UC Santa Barbara">UC Santa Barbara</option>
                                            <option value="UC Santa Cruz">UC Santa Cruz</option>
                                        </select>
                                    </div>
                                </div>
             <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Major Area<span className="errormsg"></span></label>
                                        <select 
                                        value={major} 
                                        onChange={e => majorchange(e.target.value)} 
                                        className="form-control"
                                        style={{ width: '110px', height: '20px', fontSize: '14px' }}
                                        >

                                            <option>    </option>
                                            <option value="Agriculture, Agriculture Operations, and Related Sciences">
                                                Agriculture, Agriculture Operations, and Related Sciences</option>
                                            <option value="Architecture and Related Services">Aviation</option>
                                            <option value="Area, Ethnic, Cultural, Gender, and Group Studies">Aviation</option>
                                            <option value="Aviation">Aviation</option>
                                            <option value="Biological and Biomedical Sciences">Biological and Biomedical Sciences</option>
                                            <option value="Business, Management, Marketing, and Related Support Services">
                                                Business, Management, Marketing, and Related Support Services</option>
                                            <option value="Communication, Journalism, and Related Programs">
                                                Communication, Journalism, and Related Programs</option>
                                            <option value="Communications Technologies/technicians and Support Services">
                                                Communications Technologies/technicians and Support Services</option>
                                            <option value="Computer and Information Sciences and Support Services">
                                                Computer and Information Sciences and Support Services</option>
                                            <option value="Construction Trades">Construction Trades</option>
                                            <option value="Education">Education</option>
                                            <option value="Engineering Technologies and Engineering-Related Fields">
                                                Engineering Technologies and Engineering-Related Fields</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="English Language and Literature/letters">English Language and Literature/letters</option>
                                            <option value="Family and Consumer Sciences/human Sciences">Family and Consumer Sciences/human Sciences</option>
                                            <option value="Foreign Languages, Literatures, and Linguistics">
                                                Foreign Languages, Literatures, and Linguistics</option>
                                            <option value="Health Professions and Related Programs">Health Professions and Related Programs</option>
                                            <option value="History">History</option>
                                            <option value="Homeland Security, Law Enforcement, Firefighting">
                                                Homeland Security, Law Enforcement, Firefighting</option>
                                            <option value="Human Services">Human Services</option>
                                            <option value="Legal Professions and Studies">Legal Professions and Studies</option>
                                            <option value="Liberal Arts and Sciences Studies and Humanities">
                                                Liberal Arts and Sciences Studies and Humanities</option>
                                            <option value="Library Science">Library Science</option>
                                            <option value="Mathematics and Statistics">Mathematics and Statistics</option>
                                            <option value="Mechanic and Repair Technologies/technicians">
                                                Mechanic and Repair Technologies/technicians</option>
                                            <option value="Military Technologies and Applied Sciences">
                                                Military Technologies and Applied Sciences</option>
                                            <option value="Multi/interdisciplinary Studies">Multi/interdisciplinary Studies</option>
                                            <option value="Natural Resources and Conservation">Natural Resources and Conservation</option>
                                            <option value="Parks, Recreation, Leisure, and Fitness Studies">
                                                Parks, Recreation, Leisure, and Fitness Studies</option>
                                            <option value="Personal and Culinary Services">Personal and Culinary Services</option>
                                            <option value="Philosophy and Religious Studies">Philosophy and Religious Studies</option>
                                            <option value="Physical Sciences">Physical Sciences</option>
                                            <option value="Precision Production">Precision Production</option>
                                            <option value="Psychology">Psychology</option>
                                            <option value="Science Technologies/technicians">Science Technologies/technicians</option>
                                            <option value="Social Sciences">Social Sciences</option>
                                            <option value="Theology and Religious Vocations">Theology and Religious Vocations</option>
                                            <option value="Transportation and Materials Moving">Transportation and Materials Moving</option>
                                            <option value="Visual and Performing Arts">Visual and Performing Arts</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                        

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