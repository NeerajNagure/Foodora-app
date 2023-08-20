import axios from 'axios';
import FooterAll from '../UI/FooterAll';
import LoggedInHeader from './LoggedInHeader';
import { useLoaderData,Link,json} from 'react-router-dom';
import Cookies from 'js-cookie';
import './UserLoggedIn.css';
import SortRestaurants from './SortRestaurants';
import { useState } from 'react';
const ENDPOINT='https://foodora-api.onrender.com/api/v1/'

function UserLoggedIn(){
    const data=useLoaderData();
    const [restaurants,setRestaurants]=useState(data);
    return(
        <div className='background-UserLoggedIn'>
        <LoggedInHeader userID={restaurants.user}/>
        <SortRestaurants restaurant={setRestaurants}/>
        <ul className='body-container'>
        {restaurants.map((restaurant)=>(
        <li key={restaurant._id} className='container-4'>
         <Link to={`/restaurants/${restaurant._id}`} className='restaurant-card'>
        <img src={`${restaurant.imageCover}`} alt={`${restaurant.name}`} className="imagecover"/>
        <div className="container">
        <p>{restaurant.name}</p>
        </div>
        <p className="faint">{restaurant.description}</p>
        <div className="container-2">
            <p className="star">{restaurant.ratingsAverage}
            <img src={require('./../img/star.png')}/>
            </p>
            <p className='dot'>.</p>
            <p className='faint'>Rs.{restaurant.approxPrice} for two</p>
            <p className='dot'>.</p>
           <p className="faint">{restaurant.address}</p> 
        </div>
        </Link>
        </li>
            ))}
            </ul>
    
    <FooterAll/>
    </div>
    )
}

export default UserLoggedIn;

export async function loader(){
    try{
    const jwt=Cookies.get('jwt');
    let res=await axios.post(ENDPOINT+'users/protect',{token:jwt});
    const id=res.data.id;
    res=await axios.get(ENDPOINT+'restaurants/');
    let restaurants=res.data.data.data;
    restaurants.user=id;
    return restaurants;
    }
   catch(err){
    throw json({message:err.response.data.message},{status:401});
   }
}