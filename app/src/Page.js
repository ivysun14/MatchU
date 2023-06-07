import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import './Display.css';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

var Buffer = require('buffer/').Buffer; // declare buffer

const Page = () => {
    const { userId } = useParams();
    const userDataBase = JSON.parse(sessionStorage.getItem('userDataBase'));
    const userData = userDataBase.find(item => item.id === userId);
    const [imageBuffer, setImageBuffer] = useState(null); // initialize field for image
<<<<<<< HEAD
=======

    const [comment, setComment] = useState('');
>>>>>>> fdb8a0461f52f257f5618200acb7816dc3ebd066
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const name = userData.id;
    const major = userData.major;
    const gender = userData.gender;
    const pregender = userData.pregender;
    const campus = userData.campus;
    const aboutYou = userData.aboutyou;
    const comment = userData.comment;

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

    useEffect(() => {
        fetch('http://localhost:8080/api/comments/' + userId)
            .then(response => response.json())
            .then(data => setComments(data));
    }, [userId]);

    const postComment = async (comment) => {
        try {
            const response = await fetch('http://localhost:8080/api/newComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, comment })
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            setComments(prevComments => [...prevComments, data]);
            setNewComment('');
            toast.success('Comment added successfully.');
            window.location.reload(true);
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    }

    // Check if userData exists before accessing its properties
    if (!userData) {
        console.log("Here is userid:")
        console.log(userId)
        return <div>Loading...</div>; // or handle the case when userData is not found
    }

<<<<<<< HEAD
=======
    const handleSubmit = (e) => {
        e.preventDefault();
        setComments((prevComments) => [...prevComments, comment]);
        setComment('');
    };

>>>>>>> fdb8a0461f52f257f5618200acb7816dc3ebd066
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
            {comments.map((comment, index) => (
                <div key={index}>{comment.comment}</div>
            ))}
            <form onSubmit={(e) => { e.preventDefault(); postComment(newComment); }}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
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
