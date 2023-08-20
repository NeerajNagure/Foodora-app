import './UserLoggedIn.css';
import { json } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const ENDPOINT='https://foodora-api.onrender.com'

const SortRestaurants=(props)=>{
     const[active,setActive]=useState(['']);
     const ratingClick=async ()=>{
      setActive(['filter-btn--active','','']);
      try{
        const res=await axios.get(ENDPOINT+'restaurants/?sort=-ratingsAverage');
        let restaurantData=res.data.data.data;
        props.restaurant(restaurantData);
        }
       catch(err){
        throw json({message:err.response.data.message},{status:401});
       }
     }

     const costAscClick=async()=>{
      setActive(['','filter-btn--active','']);
      try{
        const res=await axios.get(ENDPOINT+'restaurants/?sort=approxPrice');
        let restaurantData=res.data.data.data;
        props.restaurant(restaurantData);
        }
       catch(err){
        throw json({message:err.response.data.message},{status:401});
       }
     }

     const costDescClick=async()=>{
      setActive(['','','filter-btn--active']);
      try{
        const res=await axios.get(ENDPOINT+'restaurants/?sort=-approxPrice');
        let restaurantData=res.data.data.data;
        props.restaurant(restaurantData);
        }
       catch(err){
        throw json({message:err.response.data.message},{status:401});
       }
     }
   return(
    <>
    <p className='heading-6'>Available Restaurants</p>
        <div className='filter'>
        <div className='filter-txt1'>
        <img src={require('./../img/filter.png')}/>
        <div className='filter-txt'>Filters</div>
        </div>
        <div className='sort-wrap'>
        <button className={`filter-btn ${active[0]}`} onClick={ratingClick}>Rating</button>
        <button className={`filter-btn ${active[1]}`} onClick={costAscClick}>Cost:low to high</button>
        <button className={`filter-btn ${active[2]}`} onClick={costDescClick}>Cost:high to low</button>
        </div>
        </div> 
    </>
   )
}

export default SortRestaurants;