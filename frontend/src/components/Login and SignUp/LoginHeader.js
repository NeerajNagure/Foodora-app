import './LoginHeader.css';
import { Link } from 'react-router-dom';

function LoginHeader(){
    return(
        <nav id="navbar-3">
        <div className="logo-3">
         <Link to="/">
                <img src={require("./../img/foodora-logo.jpeg")} alt="" /></Link>
        </div>
        <div className="nav-3">
            <Link to="/" className="sign-3">Home</Link>
            <Link to="/" className="sign-3">About Us</Link>
            <Link to="/" className="sign-3">Contact Us</Link> 
        </div>
 </nav>
    );
}

export default LoginHeader;