import FooterAll from "../UI/FooterAll";
import './DishesUser.css';
import { json,useLoaderData } from "react-router-dom";
import Cookies from "js-cookie";
import LoggedInHeader from "./LoggedInHeader";
import axios from "axios";
import { useAlert } from "react-alert";
import SortDishes from "./SortDishes";
import { useState } from "react";
const ENDPOINT='https://foodora-api.onrender.com'

function DishesUser(){
    const restaurant=useLoaderData();
    const alert=useAlert();
    const initialDishes=restaurant.dishes;
    const [dishes,setDishes]=useState(initialDishes);

    const buttonHandler=async (event)=>{
        event.preventDefault();
       const cartItem=dishes[event.target.value];
       delete cartItem._id;
       cartItem.user=restaurant.user;
       cartItem.dish=dishes[event.target.value].id;
       cartItem.restaurant=restaurant._id;
        const reqdata={
            userId:cartItem.user,
            dishId:cartItem.dish
        }
        try{
        const response= await axios.post(ENDPOINT+'cartItems/protectCart',
        reqdata);
        if(response.data.status==='success'){
            const res=await axios.post(ENDPOINT+'cartItems/',cartItem);
            if(res.data.status==='success') {
             alert.success('Item added to the cart');
            }
        }
        }
        catch(err){
            alert.error(`${err.response.data.message}`);
        }
    }
    return(
        <div className="background-dishes">
        <LoggedInHeader  userID={restaurant.user}/>
        <p className='heading-6'>Available Dishes in {restaurant.name}</p>
        <SortDishes setDishes={setDishes} Dishes={dishes}/>
        <ul className="dish-card">
            {dishes.map((dish,index)=>(
                <li key={dish.id} className="dish-card1">
                    <img src={`${dish.imageCover}`} alt={`${dish.name}`} className="dish-img"/>
                    <div className="dish-info">
                        <p className="dish-info1">
                            {dish.name}
                            {dish.veg===true ? (<img src={require("./../img/veg-mark.png")}/>):(
                                <img src={require("./../img/nonveg-mark.png")}/>
                            )}
                        </p>
                        <p className="dish-info2">Rs.{dish.price}</p>
                        <p className="dish-info3">{dish.description}</p>
                        <form>
                        <button type="button" className="dish-btn"
                         value={index} onClick={buttonHandler}>Add to Cart</button>
                        </form>
                    </div>
                </li>
            ))}
            </ul>
        <FooterAll/>
        </div>
    )
}

export default DishesUser;

export async function loader({request,params}){
 const id=params.restaurantId;
 try{
let data,userid;
const jwt=Cookies.get('jwt');
let res=await axios.post(ENDPOINT+'users/protect',{token:jwt});
userid=res.data.id;
 res=await axios.get(ENDPOINT+'restaurants/'+id);
 if(res.data.status==='success'){
    data=res.data.data.data;
    data.user=userid;
    return data;
 }
 }
 catch(err){
    throw json({message:err.response.data.message},{status:401});
 }
}