import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import './Display.css';
import React, { useEffect } from 'react';

var Buffer = require('buffer/').Buffer; // declare buffer

const Page = () => {
    const { userId } = useParams();
    const userDataBase = JSON.parse(sessionStorage.getItem('userDataBase'));
    const userData = userDataBase.find(item => item.id === userId);
    const [imageBuffer, setImageBuffer] = useState(null); // initialize field for image

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const name = userData.id;
    const major = userData.major;
    const gender = userData.gender;
    const pregender = userData.pregender;
    const campus = userData.campus;
    const aboutYou = userData.aboutyou;

    useEffect(() => {
        if (userData) {
            fetch('http://localhost:8080/registration/' + name)
                .then((res) => res.json())
                .then((resp) => {
                    console.log(resp);
                    setImageBuffer(
                        `data:${resp.picture.contentType};base64, ${Buffer.from(
                            resp.picture.data.data
                        ).toString('base64')}`
                    );
                });
        }
    }, [name, userData]); // Include 'name' and 'userData' as a dependencies

    // Check if userData exists before accessing its properties
    if (!userData) {
        console.log("Here is userid:")
        console.log(userId)
        return <div>Loading...</div>; // or handle the case when userData is not found
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setComments((prevComments) => [...prevComments, comment]);
        setComment('');
    };

    return (

        <div
            style={{
                backgroundColor: 'lightblue',
                padding: '20px',
                minHeight: '100vh',
            }}>

            <div className="header">
                <Link to={'/home'}>Home</Link>
                <Link style={{ float: 'right' }} to={'/login'}>Logout</Link>
                <br />
            </div>

            <div>
                <form className="container">
                    <div className="card">
                        <div className="card-header">
                            <p></p>
                            <h1 align="center"> Find Your Partners On MatchU!</h1>
                            <p></p>
                        </div>
                    </div>
                </form>
                <p></p>
            </div>

            <h1>User Profile</h1>

            <div className='comment-image-container'>
                <img src={imageBuffer}></img>
            </div>

            <div className="commentUserInfo">
                <div style={{ display: 'flex' }}>
                    <strong style={{ marginRight: '3pt' }}>Name:</strong>
                    <p>{name}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <strong style={{ marginRight: '3pt' }}>Major:</strong>
                    <p>{major}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <strong style={{ marginRight: '3pt' }}>Gender:</strong>
                    <p>{gender}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <strong style={{ marginRight: '3pt' }}>Preferred Gender:</strong>
                    <p>{pregender}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <strong style={{ marginRight: '3pt' }}>Campus:</strong>
                    <p>{campus}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <strong style={{ marginRight: '3pt' }}>About Me:</strong>
                    <p>{aboutYou}</p>
                </div>
            </div>

            <div>
                <h2>Comments</h2>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    ></textarea>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Page;
