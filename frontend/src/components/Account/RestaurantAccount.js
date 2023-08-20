import LoggedInRestaurantHeader from "../LoggedIn/LoggedInRestaurantHeader"
import './Account.css';
import FooterAll from "../UI/FooterAll";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import { useAlert } from "react-alert";
import SideNav from "./SideNav";
const ENDPOINT='https://foodora-api.onrender.com/'

const RestaurantAccount=()=>{
    const restaurant=useLoaderData();
    const restaurantid=restaurant.id;
    const alert=useAlert();
    const [inputs,setInputs]=useState({name:restaurant.name,username:restaurant.username});
    const [passInputs,setPassInputs]=useState({});
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInputs(values=>({...values,[name]:value}));
    }

    const handlePassChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setPassInputs(values=>({...values,[name]:value}));
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        inputs.id=restaurantid;
        try{
        const res=await axios.patch(ENDPOINT+'restaurants/updateMe',inputs);
         if(res.data.status==='success'){
            alert.success('Settings Saved')
         }
         else{
            alert.error('Could not save settings')
         }
        }
        catch(err){
            throw json({message:err.response.data.message},{status:401});
        }
    }

    const handlePassSubmit=async(e)=>{
        e.preventDefault();
        passInputs.id=restaurantid;
        try{
            const res=await axios.patch(ENDPOINT+'restaurants/updateMyPassword',passInputs);
            if(res.data.status==='success'){
                alert.success('Password Changed!');
                Cookies.remove('jwt');
                Cookies.set('jwt',res.data.token,{expires:new Date(
                    Date.now() +  24 * 60 * 60 * 1000
                  )});
                setTimeout(()=>{window.location.reload()},4000);  
             }
             else{
                alert.error('Could not change Password')
             } 
        }
        catch(err){
            alert.error(err.response.data.message)
        }
    }

    return(
        <>
        <LoggedInRestaurantHeader restaurantId={restaurantid}/>
        <div className="container-5">
            <SideNav type="restaurant" first="side-nav--active"/>
            <div className="main-nav">
        <p className="heading-5">Your Account Settings</p>
        <form>
        <p className="txt-1">Name</p>
        <input type="text" placeholder="Enter your new name" onChange={handleChange}
        className="txtbar-1" name="name" value={inputs.name||''}/>
        <p className="txt-1">Email</p>
        <input type="username" placeholder="Enter your new username" onChange={handleChange}
        className="txtbar-1" name="username" value={inputs.username||''}/>
        <button onClick={handleSubmit} className="act-btn">Save Settings</button>
        </form>
        <div className="update-settings"></div>
        <p className="heading-5">Change Password</p>
        <form>
        <p className="txt-1">Current Password</p>
        <input type="password" className="txtbar-1" name="passwordCurrent" 
        value={passInputs.passwordCurrent||''} onChange={handlePassChange}/>
        <p className="txt-1">New Password</p>
        <input type="password" className="txtbar-1" name="password"
        value={passInputs.password||''} onChange={handlePassChange}/>
        <p className="txt-1">Confirm New Password</p>
        <input type="password" className="txtbar-1" name="passwordConfirm"
        value={passInputs.passwordConfirm||''} onChange={handlePassChange}/>
        <button type="submit" onClick={handlePassSubmit} className="act-btn">Change Password</button> 
        </form>
        </div>
    </div>
    <FooterAll/>
        </>
    )
}

export default RestaurantAccount;

export async function loader({req,params}){
    const id=params.restaurantId;
    try{
   const jwt=Cookies.get('jwt');
   let res=await axios.post(ENDPOINT+'restaurants/protect',{token:jwt});
    res=await axios.get(ENDPOINT+'restaurants/'+id);
    if(res.data.status==='success'){
       return res.data.data.data;
    }
    }
    catch(err){
       throw json({message:err.response.data.message},{status:401});
    }
}