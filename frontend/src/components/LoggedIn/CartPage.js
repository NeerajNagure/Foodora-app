import FooterAll from "../UI/FooterAll";
import LoggedInHeader from "./LoggedInHeader";
import './CartPage.css';
import axios from "axios";
import Cookies from "js-cookie";
import { json,useLoaderData,useParams } from "react-router-dom";
import { useState } from "react";
import { useAlert } from "react-alert";
const ENDPOINT='https://foodora-api.onrender.com/'

function CartPage(){
    const items=useLoaderData();
    const alert=useAlert();
    const {userId}=useParams();
    const [cartItems,setCartItems]=useState(items);
    const initialPrice=items.reduce((total,item)=>{
        return total+item.price;
    },0);
    const [total,setTotal]=useState(initialPrice);
    const decQty=(e)=>{
        if(cartItems[e.target.value].quantity>1){
        let newCart=[...cartItems];
        newCart[e.target.value].quantity-=1;
        setCartItems(newCart);
        setTotal(total-cartItems[e.target.value].price);
        }
    }
    const incQty=(e)=>{
        let newCart=[...cartItems];
        newCart[e.target.value].quantity+=1;
        setCartItems(newCart);
        setTotal(cartItems[e.target.value].price+total);
    }

    const removeHandler=async (e)=>{
         const itemID=cartItems[e.target.value]._id;
         try{
            const res=await axios.delete(ENDPOINT+'cartItems/'+itemID);
            if(res.status===204){
                window.location.reload();
            }
         }
         catch(err){
            throw json({message:err.response.data.message},{status:401});
         }
    }

    const paybtn=async (e)=>{
        e.preventDefault();
        if(cartItems.length===0){
            alert.error('There should be atleast one item in the cart');
        }
        else{
        try{
            const date=new Date();
            const res=await axios.patch(ENDPOINT+'cartItems/'+userId,
            {pastOrder:true,
            pastOrderDate:`${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`});
            if(res.data.status==='success'){
                alert.success('Order received successfully');
                setCartItems([]);
                setTotal(0);
            }
         }
         catch(err){
            alert.error(`${err.response.data.message}`);
         }
        }
    }

    return(
        <div className="background-cart">
       <LoggedInHeader/>
       <div className="container-3">
                <div className="heading-2">
            <p className="heading-4">Your Selected Items</p>
            </div>
            <ul className="cart-card1">
                {cartItems.map((item,index)=>(
                    <li key={item._id} className="cart-card">
                        <img src={`${item.imageCover}`} alt={`${item.name}`} className="cart-img"/>
                    <div className="cart-info">
                        <p className="cart-info1">
                            {item.name}{item.veg}
                            {item.veg===true ? (<img src={require("./../img/veg-mark.png")}/>):(
                                <img src={require("./../img/nonveg-mark.png")}/>
                            )}
                        </p>
                        <p className="cart-info2">Rs.{item.price}</p>
                        <div className="cart-qty">Qty:
                        <button className="qty-btn" value={index} onClick={decQty}>-</button>
                         {item.quantity}
                         <button className="qty-btn" value={index} onClick={incQty}>+</button>
                        </div>
                        <button className="cart-btn" value={index} onClick={removeHandler}>Remove from Cart</button>
                    </div>
                    </li>
                ))}
            </ul>
            <div className="total">
            Total Amount:
            <div className="amount">{total}</div>
            </div>
            <button className="cart-pay-btn" onClick={paybtn}>Pay Now</button>
            </div>
       <FooterAll/>
       </div>
    )
}

export default CartPage;

export async function loader(){
    try{
   const jwt=Cookies.get('jwt');
   let res=await axios.post(ENDPOINT+'users/protect',{token:jwt});
   const userid=res.data.id;
    res=await axios.get(ENDPOINT+'cartItems/'+userid);
    if(res.data.status==='success'){
       return res.data.data.data;
    }
    }
    catch(err){
       throw json({message:err.response.data.message},{status:401});
    }
   }