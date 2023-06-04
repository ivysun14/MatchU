import React, { Component } from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import './Display.css';

// This is a test database, should be replaced
// by a route or the real database
import testData from './Display_testDB.json';

const userName = sessionStorage.getItem('username');

const element = testData.find(item => item.id === userName);
const testUser = [element];

const Display = () => {
  const navigate = useNavigate();
  
  const [ageRange, ageRangechange] = useState("");
  const [campus, campuschange] = useState("");
  const [major, majorchange] = useState("");
  const [pregender, pregenderchange] = useState("");

  useEffect(() => { live_Search(); }, []);

  const live_Search = () => {

    // Functions below are for searching
    let cards = document.querySelectorAll('.userContainer')

    function liveSearch() {
      let search_query = document.getElementById("searchbox").value;
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].textContent.toLowerCase()
          .includes(search_query.toLowerCase())) {
          cards[i].classList.remove("is-hidden");
        } else {
          cards[i].classList.add("is-hidden");
        }
      }
    }

    // Delay in display
    let typingTimer;
    let typeInterval = 500;
    let searchInput = document.getElementById('searchbox');

    searchInput.addEventListener('keyup', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(liveSearch, typeInterval);
    });
    console.log('Executing myFunction');
  };

  const filteredUsers = testData.filter(user =>
    (((parseInt(user.age) >= parseInt(testUser.age) - parseInt(ageRange)) &&
      (parseInt(user.age) <= parseInt(testUser.age) + parseInt(ageRange))) ||
      ageRange === "")
    &&
    (user.campus === campus ||
      campus === "")
    &&
    (user.major === major ||
      major === "")
    &&
    ((user.gender === pregender) ||
      pregender === "")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Age Range:', ageRange);
    console.log('Campus:', campus);
    console.log('Major:', major);
    console.log('Preferred Gender', pregender);
    // Reset the form after submission
    ageRangechange('');
    campuschange('');
    majorchange('');
    pregenderchange('');
  };

  testData = testData.filter(user => user.id !== userName);

  return (
    <div>
      <form className="container">
        <div className="card">
          <div className="card-header">
            <p></p>
            <h1 align="center">Hi, {userName}! Find Your Partners On MatchU!</h1>
            <p></p>
          </div>
        </div>
      </form>
      <p></p>

      <div class="container">


        <div class="left-container">
          <div className="card">

            <div className="card-header">
              <p1 style={{ fontSize: '25px', fontWeight: 'bold' }}>Filters</p1>
            </div>

            <div className="card-body" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group">

                  <div className="col-lg-14">
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>Age Range</label>
                      <select value={ageRange} onChange={e => ageRangechange(e.target.value)} className="form-control">
                        <option value="">Select a age range</option>
                        <option value="1">+/- 1</option>
                        <option value="2">+/- 2</option>
                        <option value="3">+/- 3</option>
                        <option value="4">+/- 4</option>
                        <option value="5">+/- 5</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-14">
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>UC Campus</label>
                      <select value={campus} onChange={e => campuschange(e.target.value)} className="form-control">
                        <option value="">Select a campus</option>
                        <option value="UCLA">UCLA</option>
                        <option value="UC Berkeley">UC Berkeley</option>
                        <option value="UC Davis">UC Davis</option>
                        <option value="UC Irvine">UC Irvine</option>
                        <option value="UC Merced">UC Merced</option>
                        <option value="UC Riverside">UC Riverside</option>
                        <option value="UC San Diego">UC San Diego</option>
                        <option value="UC Santa Barbara">UC Santa Barbara</option>
                        <option value="UC Santa Cruz">UC Santa Cruz</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-14">
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>Major Area</label>
                      <select value={major} onChange={e => majorchange(e.target.value)} className="form-control">
                        <option value="">  Select a major area  </option>
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

                  <div className="col-lg-14">
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>Preferred Biology Sex</label>
                      <select value={pregender} onChange={e => pregenderchange(e.target.value)} className="form-control">
                        <option value="">Select a bio-sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Add the Recommendation button */}
          <div className="card mt-4">
            <div className="card-body">
                <h8>Click here to check a recommendation for you!</h8><br />
                <button className="btn btn-primary" onClick={() => navigate('/recommendation')}>
                Recommendation
              </button>
                
            </div>
          </div>
        </div >

          <div class="right-container">
            <div className="card">

              <div className="card-header">
                <p1 style={{ fontSize: '25px', fontWeight: 'bold' }}>Results</p1>
              </div>

              <div class="columns mx-1">
                <div class="column is-half is-offset-one-quarter">

                  <section class="hero is-primary mb-4">
                    <div class="hero-body">

                    </div>
                  </section>


                  <section>
                    <div>
                      <label for="searchbox" style={{ fontWeight: 'bold', marginRight: '4pt' }}>Search</label>
                      <input class='input mb-3' type="search" id="searchbox" placeholder="Enter keywords..."></input>
                    </div>
                    <ul>
                      {testData.map((user, index) => (
                        <li key={user.id}>
                          <div class="userContainer">
                            <div class="innerUserContainer">
                              <div class="userImage">
                                <h1>User's Image Should Be Here</h1>
                              </div>
                              <div class="userInfo">
                                <div style={{ display: 'flex' }}>
                                  <strong style={{ marginRight: '3pt' }}>Name:</strong>
                                  <p>{filteredUsers[index]["id"]}</p>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <strong style={{ marginRight: '3pt' }}>Age:</strong>
                                  <p>{filteredUsers[index]["age"]}</p>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <strong style={{ marginRight: '3pt' }}>Campus:</strong>
                                  <p>{filteredUsers[index]["campus"]}</p>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <strong style={{ marginRight: '3pt' }}>Major:</strong>
                                  <p>{filteredUsers[index]["major"]}</p>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <strong style={{ marginRight: '3pt' }}>Biological Gender:</strong>
                                  <p>{filteredUsers[index]["gender"]}</p>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <strong style={{ marginRight: '3pt' }}>Preferred Gender:</strong>
                                  <p>{filteredUsers[index]["pregender"]}</p>
                                </div>
                              </div>
                            </div>
                            <div class="aboutMeContainer">
                              <strong style={{ marginRight: '3pt' }}>About Me:</strong>
                              <p>{filteredUsers[index]["aboutyou"]}</p>
                            </div>
                            <div class="profileUrl">
                              <strong>Profile Link:</strong>
                              <p>Link/Url to this user's profile (need implement)</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                  </section>

                </div>
              </div>
            </div>
          </div>
        </div>


      </div >
      );
}

export default Display;
