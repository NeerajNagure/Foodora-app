import { Link } from 'react-router-dom';
import './HomePage.css';
import FooterAll from './UI/FooterAll';
import HeaderHome from './UI/HeaderHome';

function Homepage(){
    return(
        <div>
        <HeaderHome/>
        <div className="bg">
        <div className='container-1'>
        <div className='container-1-txt'>
            <p className='container-1-heading'>Welcome to Foodora!</p>
            <p className='container-1-txt1'>Order your favourite food from your 
            favourite restaurants or register your restaurant to accept the orders
            and earn revenue.</p>
        </div>
        <img src={require('./img/hero.webp')}/>
        </div>
        <div className="customer-card">
        <img src={require("./img/food-3.jpg")} className="cust-img"/>
        <div className='customer-card-container'>
        <p className="customer-card-txt">Hungry?</p>
        <p className='container-1-txt1'>Register as a user and order now!</p>
        <Link to='/signupUser' className="link">Register</Link>
        </div>
        </div>
        <div className="customer-card">
            <img src={require("./img/restaurant.jpg")} className="rest-img"/>
            <div className='customer-card-container'>
            <p className='customer-card-txt'>Earn Revenue</p>
            <p className="container-1-txt1">Register as a Restaurant and accept orders and generate revenue</p>
            <Link to='/signupRestaurant' className="link">Register</Link>
            </div>
        </div>
    </div>
    <FooterAll/>
    </div>
    )
}

export default Homepage;