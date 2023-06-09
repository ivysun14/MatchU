import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';

import './Display.css';

const Display = () => {

  const userName = sessionStorage.getItem('username');
  const userDataBase = JSON.parse(sessionStorage.getItem('userDataBase'));
  const imageBufferDB = JSON.parse(sessionStorage.getItem('imageBuffer'));
  const element = userDataBase.find(item => item.id === userName);
  const userDB = [element];

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
  };

  const allUsers = userDataBase.filter(user =>
    (((parseInt(user.age) >= parseInt(userDB[0].age) - parseInt(ageRange)) &&
      (parseInt(user.age) <= parseInt(userDB[0].age) + parseInt(ageRange))) ||
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
    // Reset the form after submission
    ageRangechange('');
    campuschange('');
    majorchange('');
    pregenderchange('');
  };

  let filteredUsers = allUsers.filter(user => user.id !== userName);

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

      <div className="container">

        <div className="left-container">
          <div className="card">

            <div className="card-header" style={{ fontSize: '25px', fontWeight: 'bold' }}>
              Filters
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
              <p>Click here to check a recommendation for you!</p>
              <button className="btn btn-primary" onClick={() => navigate('/recommendation')}>
                Recommendation
              </button>

            </div>
          </div>
        </div >

        <div className="right-container">
          <div className="card">

            <div className="card-header" style={{ fontSize: '25px', fontWeight: 'bold' }}>
              Results
            </div>

            <div className="columns mx-1">
              <div className="column is-half is-offset-one-quarter">

                <section className="hero is-primary mb-4">
                  <div className="hero-body">

                  </div>
                </section>


                <section>
                  <div>
                    <label for="searchbox" style={{ fontWeight: 'bold', marginRight: '4pt' }}>Search</label>
                    <input className='input mb-3' type="search" id="searchbox" placeholder="Enter keywords..."></input>
                  </div>
                  <ul>
                    {filteredUsers.map((user, index) => (
                      <li key={user.id}>
                        <div className="userContainer">
                          <div className='display-image-container'>
                            <img src={imageBufferDB[user.id]} alt="" />
                          </div>
                          <div className="innerUserContainer">
                            <div className="userInfo">
                              <div style={{ display: 'flex' }}>
                                <Link
                                  className="userLink"
                                  to={`/user/${filteredUsers[index]["id"]}`}
                                  onClick={() => navigate(`/user/${filteredUsers[index]["id"]}`)}
                                >
                                  {filteredUsers[index]["id"]}
                                </Link>

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
                          <div className="aboutMeContainer">
                            <strong style={{ marginRight: '3pt' }}>About Me:</strong>
                            <p>{filteredUsers[index]["aboutyou"]}</p>
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
