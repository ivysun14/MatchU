import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import './Display.css';

const userName = sessionStorage.getItem('username');
var Buffer = require('buffer/').Buffer; // declare buffer

const Page = () => {
    const { userId } = useParams();
    const userDataBase = JSON.parse(sessionStorage.getItem('userDataBase'));
    const userData = userDataBase.find(item => item.id === userId);
    const [imageBuffer, setImageBuffer] = useState(null); // initialize field for image
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
        fetch(`http://localhost:8080/comments/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data); // log the data
                if (Array.isArray(data)) {
                    setComments(data);
                } else {
                    console.error('API did not return an array');
                }
            });
    }, [userId]);

    const updateComment = (comment) => {
        const commentWithUserId = `${userName }: ${comment}`;
      
        fetch(`http://localhost:8080/comments/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ comments: commentWithUserId })
        })
          .then(res => res.json())
          .then(data => {
            setComments(prevComments => [...prevComments, commentWithUserId]);
            setNewComment('');
            toast.success('Comment added successfully.');
          })
          .catch(err => {
            toast.error('Failed to update comment: ' + err.message);
          });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateComment(newComment);
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

            <div>
                <h1>User Profile</h1>
            </div>

            <div className='image-container' style={{ marginLeft: '-100px' }}>
                <img src={imageBuffer} />
            </div>

            <div>
                <p style={{ marginLeft: '8cm', fontSize: '12pt' }}>Name: {name}</p>
                <p style={{ marginLeft: '8cm', fontSize: '12pt' }}>Major: {major}</p>
                <p style={{ marginLeft: '8cm', fontSize: '12pt' }}>Gender: {gender}</p>
                <p style={{ marginLeft: '8cm', fontSize: '12pt' }}>Preferred Gender: {pregender}</p>
                <p style={{ marginLeft: '8cm', fontSize: '12pt' }}>Campus: {campus}</p>
                <p style={{ marginLeft: '8cm', fontSize: '12pt' }}>About Me: {aboutYou}</p>
                <br/>
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
