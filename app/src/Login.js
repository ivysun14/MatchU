import { useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import loginImage from "./photo.jpg"

var Buffer = require('buffer/').Buffer;

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    const [userDataBase, setUserDataBase] = useState([])

    const [imageBuffer, setImageBuffer] = useState(null); // initialize field for image


    const fetchUserData = () => {
        fetch("http://localhost:8080/registration/")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUserDataBase(data);
            })
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    useEffect(() => {
        userDataBase.forEach((user) => {
          fetch(`http://localhost:8080/registration/${user.id}`)
            .then((res) => res.json())
            .then((resp) => {
              setImageBuffer((prevImageBuffer) => {
                const updatedImageBuffer = {
                  ...prevImageBuffer,
                  [user.id]: `data:${resp.picture.contentType};base64, ${Buffer.from(resp.picture.data.data).toString('base64')}`,
                };
                return updatedImageBuffer;
              });
            })
            .catch((error) => {
              console.error('Error fetching image:', error);
            });
        });
      }, [userDataBase]);


    useEffect(() => {
        sessionStorage.clear(); // so the person have to log back in when logged out 
    }, [])

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            //console.log('proceed');
            fetch('http://localhost:8080/registration/' + username).then((res) => {
                console.log('http://localhost:8080/registration/' + username);
                return res.json();
            }).then((resp) => {
                console.log(resp);
                if (resp === null) {
                    toast.error('Please Enter Valid Username');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('userDataBase', JSON.stringify(userDataBase));
                        sessionStorage.setItem('imageBuffer', JSON.stringify(imageBuffer));
                        usenavigate('/home');
                    } else {
                        toast.error('Please Enter Valid Credentials');
                    }
                }
            }).catch((err) => {
                toast.error("Login Failed Due to :" + err.message)
            });

        }
    }

    const validate = () => {
        let result = true;
        if (username === "" || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        else if (password === "" || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    return (

        <div
            style={{
                backgroundColor: 'lightblue',
                padding: '5px',
                minHeight: '100vh',
            }}>
            <div className="container">
                <img className="image-1" src={loginImage} width = "500" alt="Login image"></img>
            </div>


            <div className="row">
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: '20px' }}>
                    <form className="container" onSubmit={ProceedLogin}>
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>User Name <span className="errmsg">*</span></label>
                                    <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Password <span className="errmsg">*</span></label>
                                    <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Login</button>  |
                                <Link className="btn btn-success" to={'/register'}>New User</Link>

                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;