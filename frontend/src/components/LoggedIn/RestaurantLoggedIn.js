import FooterAll from "../UI/FooterAll";
import LoggedInRestaurantHeader from "./LoggedInRestaurantHeader";
import './RestaurantLoggedIn.css';
import Cookies from "js-cookie";
import axios from "axios";
import { json,useLoaderData,Link,useParams } from "react-router-dom";
import { useAlert } from "react-alert";
const ENDPOINT='http://127.0.0.1:7000/api/v1/'

function RestaurantLoggedIn(){
    const dishes=useLoaderData().dishes;
    const alert=useAlert();
    const params=useParams();

    const deleteHandler=async (e)=>{
        e.preventDefault();
        const dishid=dishes[e.target.value].id;
        try{
            const res=await axios.delete(ENDPOINT+'dishes/'+dishid);
            if(res.status===204){
                window.location.reload();
            }
        }
        catch(err){
            alert.error(err.response.data.message);
        }
    }

    return (
        <div className="background-restaurant">
            <LoggedInRestaurantHeader restaurantId={params.restaurantId} />
            <div className="container-3">
                <div className="heading-2">
            <p className="heading-1">Listed Dishes</p>
            <Link to={`/${params.restaurantId}/ListDish`} className="publish-btn">
                List a New Dish</Link>
            </div>
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
                        <button className="dish-btn" value={index} 
                        onClick={deleteHandler}>Delete</button>
                    </div>
                </li>
            ))}
            </ul>
            </div>
            <FooterAll/>
        </div>
    )
}

export default RestaurantLoggedIn;

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