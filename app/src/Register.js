import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = () => {

    const [id, idchange] = useState("");
    const [password, passwordchange] = useState("");
    const [age, agechange] = useState("");
    const [campus, campuschange] = useState("");
    const [gender, genderchange] = useState("");
    const [major, majorchange] = useState("");
    const [aboutyou, aboutyouchange] = useState("");
    const [pregender, pregenderchange] = useState("");

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

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { id, password, age, campus, gender, major, aboutyou, pregender };
        //console.log(regobj);
        //if (!IsValid){console.log(IsValid);}
        if (IsValid()) {
            fetch("http://localhost:8000/users", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regobj) //converts a JavaScript object or value into a JSON string representation
            }).then((res) => {
                toast.success('Registered successfully.');
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                
                                <div className="col-lg-6"> {/* this is how long the text box is */}
                                    <div className="form-group">
                                        <label>Username<span className="errormsg">*</span></label>
                                        <input value={id} onChange={e => idchange(e.target.value)}
                                            className="form-control"></input> {/* text box */}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password<span className="errormsg">*</span></label>
                                        <input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Age<span className="errormsg">*</span></label>
                                        <input value={age} onChange={e => agechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>UC Campus<span className="errormsg">*</span></label>
                                        <select value={campus} onChange={e => campuschange(e.target.value)} className="form-control">
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
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Biological Gender<span className="errormsg">*</span></label>
                                        <select value={gender} onChange={e => genderchange(e.target.value)} className="form-control">
                                            <option>    </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Major Area<span className="errormsg">*</span></label>
                                        <select value={major} onChange={e => majorchange(e.target.value)} className="form-control">
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
                                <div className="col-lg-12 mb-3"> {/* indicate a margin-bottom of a size 3 */}
                                    <div className="form-group">
                                        <label>About Yourself</label>
                                        <textarea value={aboutyou} onChange={e => aboutyouchange(e.target.value)} className="form-control"></textarea>

                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label>Preferred Biological Gender</label>
                                        <br></br>
                                        <input type="radio" checked={pregender === 'Male'} onChange={e => pregenderchange(e.target.value)} name="gender" value="Male" className="app-check"></input>
                                        <label>Male</label>
                                        <input type="radio" checked={pregender === 'Female'} onChange={e => pregenderchange(e.target.value)} name="gender" value="Female" className="app-check"></input>
                                        <label>Female</label>

                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-group">
                                        <label className="form-label">Profile Picture<span className="errormsg">*</span></label>
                                        <input type="file" className="form-control"></input>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>   |
                            <Link className="btn btn-success" to={'/'}>Back to Home Page</Link>

                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;