import './HeaderHome.css';
import React from 'react';
import { Link } from 'react-router-dom';

function HeaderHome(){
    return(
        <header>
    <nav id="navbar">
            <div className="logo">
            <Link to='/'>
                <img src={require("./../img/foodora-logo.jpeg")} alt="" className="foodora"/>
                </Link>
            </div>
            <div className="nav">
                <Link to="/" className="sign">Home</Link>
                <Link to="/" className="sign">About Us</Link>
                <Link to="/" className="sign">Contact Us</Link> 
            </div>
            <div className="nav-user">
            <Link to="/signupUser" className="sign">Sign Up</Link>
            <Link to="/loginUser" className="login">Login</Link>
            </div>
     </nav>
     </header>
    )
}

export default HeaderHome;