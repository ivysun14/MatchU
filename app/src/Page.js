import { useParams, Link } from 'react-router-dom';
import './Display.css';

const Page = () => {
    const { userId } = useParams();
    const userDataBase = JSON.parse(sessionStorage.getItem('userDataBase'));
    const userData = userDataBase.find(item => item.id === userId);

    // Check if userData exists before accessing its properties
    if (!userData) {
        console.log("Here is userid:")
        console.log(userId)
        return <div>Loading...</div>; // or handle the case when userData is not found
    }

    const name = userData.id;
    const major = userData.major;
    const gender = userData.gender;
    const pregender = userData.pregender;
    const campus = userData.campus;
    const aboutYou = userData.aboutyou;

    return (

        <div
            style={{
                backgroundColor: 'lightblue',
                padding: '20px',
                minHeight: '100vh',
            }}>

            <div className="header">
                <Link to={'/'}>Home</Link>
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

            <div class="userImage">
                <h>User's Image Should Be Here</h>
            </div>

            <div>
                <h1>User Profile</h1>
                <p className="userInfo">Name: {name}</p>
                <p className="userInfo">Major: {major}</p>
                <p className="userInfo">Gender: {gender}</p>
                <p className="userInfo">Preferred Gender: {pregender}</p>
                <p className="userInfo">Campus: {campus}</p>
                <p className="userInfo">About Me: {aboutYou}</p>
            </div>
        </div>
    );
};

export default Page;
