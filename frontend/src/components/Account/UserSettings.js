import './Account.css';
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
const ENDPOINT='https://foodora-api.onrender.com'

const UserSettings=(props)=>{
    const navigate=useNavigate();
    const user=props.user;
    const alert=useAlert();
    const [inputs,setInputs]=useState({name:user.name,email:user.email});
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
        inputs.id=user.id;
        try{
        const res=await axios.patch(ENDPOINT+'users/updateMe',inputs);
         if(res.data.status==='success'){
            alert.success('Settings Saved')
         }
         else{
            alert.error('Could not save settings')
         }
        }
        catch(err){
            alert.error(err.response.data.message)
        }
    }

    const handlePassSubmit=async(e)=>{
        e.preventDefault();
        passInputs.id=user.id;
        try{
            const res=await axios.patch(ENDPOINT+'users/updateMyPassword',passInputs);
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

    const handleDeleteAcc=async (e)=>{
        e.preventDefault();
        if(window.confirm("Are you sure? This will delete all your data")=== true){
        if(!passInputs.id)
        passInputs.id=user.id;
        try{
            const res=await axios.delete(ENDPOINT+'users/deleteMe',
            {data:{passwordCurrent:passInputs.passwordCurrent,id:passInputs.id}});
            if(res.status===204){
                alert.success('Account Deleted Successfully');
                Cookies.remove('jwt');
                setTimeout(()=>{window.location.reload()},4000);  
                navigate('/');
            }
        }
        catch(err){
            alert.error(err.response.data.message)
        }
    }
    }

    return (
        <div className="main-nav">
        <p className="heading-5">Your Account Settings</p>
        <form>
        <p className="txt-1">Name</p>
        <input type="text" placeholder="Enter your new name" onChange={handleChange}
        className="txtbar-1" name="name" value={inputs.name||''}/>
        <p className="txt-1">Email</p>
        <input type="email" placeholder="Enter your new email" onChange={handleChange}
        className="txtbar-1" name="email" value={inputs.email||''}/>
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
        <div className="update-settings"></div>
        <p className="heading-5">Delete Account</p>
        <form>
        <p className="txt-1">Current Password</p>
        <input type="password" className="txtbar-1" onChange={handlePassChange}
        name="passwordCurrent" value={passInputs.passwordCurrent||''}
         placeholder="Enter the current password to delete the account"/>
        <button type="button" onClick={handleDeleteAcc} className="act-btn">Delete Account</button>
        </form>
        </div>
    )
}

export default UserSettings;