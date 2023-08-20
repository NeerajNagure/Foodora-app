import { useState } from 'react';
import './Account.css';
import { useAlert } from 'react-alert';
import axios from 'axios';
const ENDPOINT='https://foodora-api.onrender.com/api/v1/'

const RateForm=(props)=>{
    const item=props.pastorder;
    const alert=useAlert();
    const [rate,setRate]=useState();

    const changeHandler=(e)=>{
        setRate(e.target.value);
      }
  
      const ratebtn=async (e)=>{
         e.preventDefault();
         const newrate=Number(rate);
         try{
          const res=await axios.patch(ENDPOINT+'restaurants/updateRatings/'
          +item.restaurant.id,{rating:newrate});
          if(res.data.status==='success'){
             alert.success('Thanks for the feedback');
          }
         }
         catch(err){
             alert.error(err.response.data.message);
         }
      }

    return(
        <>
        <form>
        <p className='porder-rate'>Rate this restaurant(Between 1-5):
        <input type='number' className='porder-bar' value={rate}
         onChange={changeHandler}/>
          </p>
        </form>
        <button className='porder-rate-btn' onClick={ratebtn}>Rate</button>
        </>
    )
}

export default RateForm;