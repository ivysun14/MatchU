import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Display from './Display';
import Recommendation from './recommendation';
import Profile from './Profile';
import Page from './Page';
import { ToastContainer } from 'react-toastify';

import './App.css'; // Import the CSS file
import React from 'react';
import ReactDOM from 'react-dom';


function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path="/recommendation" element={<Recommendation />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/user/:userId" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

/*ReactDOM.render(
  <React.StrictMode>
    <div style={{ backgroundColor: 'lightblue' }}>
      //{Your app components }
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);*/


export default App;
