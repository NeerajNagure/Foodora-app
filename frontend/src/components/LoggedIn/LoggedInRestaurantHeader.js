import Cookies from 'js-cookie';
import './LoggedInHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

function LoggedInRestaurantHeader(props){
    const navigate=useNavigate();
    const alert=useAlert();
    const account=()=>{
        navigate(`/restaurantAccount/${props.restaurantId}`);
    }
    const logout=()=>{
        Cookies.remove('jwt');
        navigate('/');
        alert.success('You have been logged out');
        setTimeout(()=>{
            window.location.reload();
        },2500);
    }
    return (
        <nav id="navbar-1">
            <Link to='/' className='logo-1'>
                <img src={require("./../img/foodora-logo.jpeg")} alt="" /></Link>
            <div className="nav-1">
                <Link to='/' className="nav-ele">Home</Link>
                <Link to='/' className="nav-ele">About Us</Link>
                <Link to='/' className="nav-ele">Contact Us</Link> 
            </div>
            <button onClick={account} className="account">
            <img src={require('./../img/user.png')}/>Account</button>
            <button onClick={logout} className="logout">
            <img src={require('./../img/logout.png')}/>Log Out</button>
     </nav>
    )
}

export default LoggedInRestaurantHeader;