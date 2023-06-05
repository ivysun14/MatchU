import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Display.css';


const Recommendation = () => {

  const userName = sessionStorage.getItem('username');
  const userDataBase = JSON.parse(sessionStorage.getItem('userDataBase'));

  console.log(userName)
  console.log(userDataBase)
  
    const element = userDataBase.find(item => item.id === userName);
    const userDB = [element][0];

    const navigate = useNavigate();
    
    const calculateDistance = (campus1, campus2) => {
        const ucCampusCoordinates = {
            berkeley: { lat: 37.8719, lon: -122.2585 },
            davis: { lat: 38.5382, lon: -121.7617 },
            irvine: { lat: 33.6461, lon: -117.8427 },
            losAngeles: { lat: 34.0689, lon: -118.4452 },
            merced: { lat: 37.3667, lon: -120.4247 },
            riverside: { lat: 33.9737, lon: -117.3281 },
            sanDiego: { lat: 32.8795, lon: -117.2359 },
            santaBarbara: { lat: 34.414, lon: -119.8489 },
            santaCruz: { lat: 36.9895, lon: -122.0588 },
        };

        if (!ucCampusCoordinates.hasOwnProperty(campus1) || !ucCampusCoordinates.hasOwnProperty(campus2)) {
            return "Invalid campus name(s).";
        }

        const campus1Coords = ucCampusCoordinates[campus1];
        const campus2Coords = ucCampusCoordinates[campus2];

        const earthRadius = 6371; // Radius of the Earth in kilometers
        const dLat = degToRad(campus2Coords.lat - campus1Coords.lat);
        const dLon = degToRad(campus2Coords.lon - campus1Coords.lon);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degToRad(campus1Coords.lat)) *
            Math.cos(degToRad(campus2Coords.lat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c; // Distance in kilometers
        return distance;
    };


    // Helper function to convert degrees to radians
    const degToRad = (degrees) => {
        return degrees * (Math.PI / 180);
    };

    // const handleRecommendation = () => {
    //     // Filter out users with different biological sex than their preferred biological sex
    //     const filteredUsers = userDataBase.filter((user) => {
    //         return (
    //             user.pregender === userDB.gender &&
    //             user.gender === userDB.pregender
    //         );
    //     });

    const filteredUsers = userDataBase.filter(user =>
        (user.pregender === userDB.gender &&
        user.gender === userDB.pregender)
      );

      console.log(filteredUsers);

      const handleRecommendation = () => {

        // Calculate similarity scores for each user
        const similarityScores = filteredUsers.map((user) => {
            // Define weights for different factors (you can adjust these as needed)
            const ageWeight = 0.2;
            const majorWeight = 0.1;
            const distanceWeight = 0.4;
            // Add more factors and adjust their weights as necessary

            // Calculate similarity score for the current user
            const ageScore = 1 - Math.abs(user.age - userDB.age) / 100;
            const majorScore = user.major === userDB.major ? 1 : 0;
            const distanceScore = calculateDistance(userDB.campus, user.campus);

            // Calculate the overall similarity score
            const similarityScore =
                ageWeight * ageScore + majorWeight * majorScore + distanceWeight * (100000 - distanceScore);
            // Add more factors to the overall similarity score calculation
            return { user, similarityScore };
        });

        // Sort users by similarity score in descending order
        similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

        // Display all users in order of similarity
        setRecommendedUsers(similarityScores.map((score) => score.user));
    };

    const [recommendedUsers, setRecommendedUsers] = useState([]);

    useEffect(() => {
        handleRecommendation(); // Call handleRecommendation when the component is rendered
    }, []);

    console.log(recommendedUsers);

    return (
        <div style={{
            backgroundColor: 'lightblue',
            padding: '20px',
            minHeight: '100vh',
        }}>
        
        <div class="container">
            <img src="https://www.avoxi.com/wp-content/uploads/2022/03/Swipe-Right-5-Questions-for-CPaaS-Providers-Blog.png" alt="Image description" width="800" class="image-1" />
         </div>
            <form className="container">
                <div className="card">
                    <div className="card-header">
                        <p></p>
                        <h1 style={{ textAlign: 'center', color: 'lightblue' }}>Hi! Find Your Partners On MatchU!</h1>
                        <p></p>
                    </div>
                </div>
            </form>
            <div>
                <button onClick={() => navigate('/')}>Go Back</button> {/* Add a button to go back to the main page */}
            </div>
            <p></p>
            <p></p>
            <h1 style={{ color: 'white' }}>Your top ten match</h1>

            <ul>
                {recommendedUsers.map((user, index) => (
                    <li>
                        <div class="userContainer">
                            <div class="innerUserContainer">
                                <div class="userImage">
                                    <h1>User's Image Should Be Here</h1>
                                </div>
                                <div class="userInfo">
                                    <div style={{ display: 'flex' }}>
                                        <strong style={{ marginRight: '3pt' }}>Name:</strong>
                                        <p>{recommendedUsers[index]["id"]}</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <strong style={{ marginRight: '3pt' }}>Age:</strong>
                                        <p>{recommendedUsers[index]["age"]}</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <strong style={{ marginRight: '3pt' }}>Campus:</strong>
                                        <p>{recommendedUsers[index]["campus"]}</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <strong style={{ marginRight: '3pt' }}>Major:</strong>
                                        <p>{recommendedUsers[index]["major"]}</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <strong style={{ marginRight: '3pt' }}>Biological Gender:</strong>
                                        <p>{recommendedUsers[index]["gender"]}</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <strong style={{ marginRight: '3pt' }}>Preferred Gender:</strong>
                                        <p>{recommendedUsers[index]["pregender"]}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="aboutMeContainer">
                                <strong style={{ marginRight: '3pt' }}>About Me:</strong>
                                <p>{recommendedUsers[index]["aboutyou"]}</p>
                            </div>
                            <div class="profileUrl">
                                <strong>Profile Link:</strong>
                                <p>Link/Url to this user's profile (need implement)</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendation;