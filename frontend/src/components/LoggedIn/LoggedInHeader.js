import './LoggedInHeader.css';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';

function LoggedInHeader(props){
    const navigate=useNavigate();
    const alert=useAlert();
    const account=()=>{
        navigate(`/userAccount/${props.userID}/settings`);
    }

    const logout=()=>{
        Cookies.remove('jwt');
        navigate('/');
        alert.success('You have been logged out');
        setTimeout(()=>{
            window.location.reload();
        },2500);
    }

    const cartHandler=()=>{
         navigate(`/restaurants/${props.userID}/cart`);
    }

    return (
        <nav id="navbar-1">
            <Link to='/' className='logo-1'>
                <img src={require("./../img/foodora-logo.jpeg")} alt="" /></Link>
            <div className="nav-1">
                <Link to='/' className="sign-1">Home</Link>
                <Link to='/' className="sign-1">About Us</Link>
                <Link to='/' className="sign-1">Contact Us</Link> 
            </div>
            <button onClick={cartHandler} className='cart'>
                <img src={require("./../img/cart.png")}/>Cart
            </button>
            <button onClick={account} className="account">
            <img src={require('./../img/user.png')}/>Account</button>
            <button onClick={logout} className="logout">
            <img src={require('./../img/logout.png')}/>Log Out</button>
     </nav>
    )
}

export default LoggedInHeader;