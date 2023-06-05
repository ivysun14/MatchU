import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";
import './Profile.css';

const Profile = () => {

    const [id, setId] = useState("Your Id");
    const [password, setPassword] = useState("Your Password");
    const [age, setAge] = useState("Your Age");
    const [campus, setCampus] = useState("Your Campus");
    const [gender, setGender] = useState("Your Gender");
    const [major, setMajor] = useState("Your Major");
    const [aboutyou, setAboutyou] = useState("Likes to play tennis.");
    const [pregender, setPregender] = useState("Your Preferred Gender");

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
                console.log(resp);

                setId(resp.id);
                setPassword(resp.password);
                setAge(resp.age);
                setCampus(resp.campus);
                setGender(resp.gender);
                setMajor(resp.major);
                setAboutyou(resp.aboutyou);
                setPregender(resp.pregender);
            });
    }, []); // Empty dependency array to run the effect only once


    /*
    fetch('http://localhost:8080/registration').then((res) => {
        return res.json();
    }).then((resp) => {
        const obj = resp.map((users) => users);
        console.log(obj[0]);
    });
    */

    const handlesubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        let regobj = { id, password, age, campus, gender, major, aboutyou, pregender };
        if (IsValid()) {
            fetch("http://localhost:8080/registration/6470679f9c6b17e0626cafdc", {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regobj) //converts a JavaScript object or value into a JSON string representation
            }).then((res) => {
                toast.success('Information updated successfully.');
                navigate('/display');
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
                    <img src="data:image/jpeg;base64,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" alt='' height="100px" width="100px" />
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
                <button type="submit" className="btn btn-primary">Submit changes</button> | <Link className="btn btn-success" to={'/display'}>Back to main</Link>
                <br></ br>
                <span className='text'>*Only fields with <AiFillEdit className='icon' /> are editable</ span>
            </div>
        </form >
    );
}

export default Profile
