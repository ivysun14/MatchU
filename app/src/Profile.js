import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";
import './Profile.css';
var Buffer = require('buffer/').Buffer; // declare buffer

const Profile = () => {

    const [id, setId] = useState("Your Id");
    const [password, setPassword] = useState("Your Password");
    const [age, setAge] = useState("Your Age");
    const [campus, setCampus] = useState("Your Campus");
    const [gender, setGender] = useState("Your Gender");
    const [major, setMajor] = useState("Your Major");
    const [aboutyou, setAboutyou] = useState("Likes to play tennis.");
    const [pregender, setPregender] = useState("Your Preferred Gender");
    const [imageBuffer, setImageBuffer] = useState(null); // initialize field for image

    const navigate = useNavigate();

    const IsValid = () => {
        let isproceed = true;
        let errormessage = "Please enter the value in";
        if (id === "" || id === null) {
            isproceed = false;
            errormessage += ' Username';
        }
        else if (password === "" || password === null) {
            isproceed = false;
            errormessage += ' Password';
        }
        else if (age === "" || age === null) {
            isproceed = false;
            errormessage += ' Age';
        }
        else if (!(age >= 18 && age <= 100)) {
            isproceed = false;
            toast.warning('Please enter a valid age');
            return isproceed;
        }
        else if (campus === "" || campus === null) {
            isproceed = false;
            errormessage += ' Campus';
        }
        else if (gender === "" || gender === null) {
            isproceed = false;
            errormessage += ' Biological Gender';
        }
        else if (major === "" || major === null) {
            isproceed = false;
            errormessage += ' Major';
        }
        else if (pregender === "" || pregender === null) {
            isproceed = false;
            errormessage += ' Preferred Biological Gender';
        }

        if (!isproceed) {
            toast.warning(errormessage);
        }
        return isproceed;
    }

    const userName = sessionStorage.getItem('username');

    useEffect(() => {
        fetch('http://localhost:8080/registration/' + userName)
            .then((res) => res.json())
            .then((resp) => {
                //console.log(resp);

                setId(resp.id);
                setPassword(resp.password);
                setAge(resp.age);
                setCampus(resp.campus);
                setGender(resp.gender);
                setMajor(resp.major);
                setAboutyou(resp.aboutyou);
                setPregender(resp.pregender);
                setImageBuffer(`data:${resp.picture.contentType};base64, ${Buffer.from(resp.picture.data.data).toString('base64')}`)
            });
    }, []); // Empty dependency array to run the effect only once

    const handlesubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        let regobj = { id, password, age, campus, gender, major, aboutyou, pregender };
        if (IsValid()) {
            fetch("http://localhost:8080/registration/" + userName, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regobj) //converts a JavaScript object or value into a JSON string representation
            }).then((res) => {
                toast.success('Information updated successfully.');
                navigate('/');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    return (
        <form className='Profile' onSubmit={handlesubmit}>
            <div className='upper-container'>
                <h2 className='color_text'>Welcome, {id}!</h2>
                <div className='image-container'>
                    <img src={imageBuffer}></img>
                </div>
            </div>
            <div className='lower-container'>
                <div className="row">
                    <div className="col-lg-6">
                        <label className='labels'>Your ID</label><br />
                        <span>{id}</span>
                    </div>
                    <div className="col-lg-6">
                        <label className='labels'>Your Password</label><AiFillEdit className='icon' /><br />
                        <input className='someclass' value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div className="col-lg-6">
                        <label className='labels'>Your Age</label><AiFillEdit className='icon' /><br />
                        <input className='someclass' value={age} onChange={e => setAge(e.target.value)}></input>
                    </div>
                    <div className="col-lg-6">
                        <label className='labels'>Your UC Campus</label><AiFillEdit className='icon' /><br />
                        <select className='someclass' value={campus} onChange={e => setCampus(e.target.value)}>
                            <option>    </option>
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
                    <div className="col-lg-6">
                        <label className='labels'>Your Biological Gender</label><AiFillEdit className='icon' /><br />
                        <select className='someclass' value={gender} onChange={e => setGender(e.target.value)}>
                            <option>    </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="col-lg-6">
                        <label className='labels'>Your Major</label><AiFillEdit className='icon' /><br />
                        <select className='someclass' value={major} onChange={e => setMajor(e.target.value)}>
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
                    <p>
                        <label className='labels'>About You</label><AiFillEdit className='icon' /><br />
                        <input className='noteclass' value={aboutyou} onChange={e => setAboutyou(e.target.value)}></input>
                    </p>
                    <div className="col-lg-12">
                        <label className='labels'>Your Preferred Matching Gender</label><AiFillEdit className='icon' /><br />
                        <input type="radio" checked={pregender === 'Male'} onChange={e => setPregender(e.target.value)} name="gender" value="Male" className="button_control"></input>
                        <label>Male</label>
                        <input type="radio" checked={pregender === 'Female'} onChange={e => setPregender(e.target.value)} name="gender" value="Female" className="button_control"></input>
                        <label>Female</label>
                    </div>
                </div>
                <br></ br>
                <button type="submit" className="btn btn-primary">Submit Changes and Re-Login</button> | <Link className="btn btn-success" to={'/home'}>Discard Changes and Back to Main</Link>
                <br></ br>
                <span className='text'>*Only fields with <AiFillEdit className='icon' /> are editable</ span>
            </div>
        </form >
    );
}

export default Profile
