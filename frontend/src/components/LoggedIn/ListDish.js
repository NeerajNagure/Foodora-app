import axios from "axios";
import FooterAll from "../UI/FooterAll";
import LoggedInRestaurantHeader from "./LoggedInRestaurantHeader";
import './ListDish.css';
import { Form, useNavigate, useActionData, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useAlert } from "react-alert";
const ENDPOINT='https://foodora-api.onrender.com/api/v1/'

function ListDish(){
    const navigate=useNavigate();
    const alert=useAlert();
    const data=useActionData();
    const params=useParams();
    if(data && data.visible==='true'){
        alert.show(`${data.msg}`,{type:data.type});
        data.visible='false';
        if(data.type==='success')
        navigate(`/${data.id}`);
    }

    return(
        <div className="background-list">
            <LoggedInRestaurantHeader restaurantId={params.restaurantId}/>
            <div className="signup">
                <p className="heading-3">List a Dish</p>
                <Form method="post">
                    <p className="txt">Enter name of the dish:</p>
                    <input type="text" placeholder="Name" 
                    className="txtbar" name="name"/>
                   <p className="txt">Enter price of the dish:</p>
                   <input type="number" placeholder="Price" 
                   className="txtbar" name="price"/>
                   <p className="txt">Enter description of the dish:</p>
                   <textarea rows="10" cols="50" placeholder="Description" 
                   className="txtbar1" name="description"/>
                   <p className="txt">Enter the image cover address:</p>
                   <input type="text" placeholder="Enter the image address" 
                   className="txtbar" name="image"/>
                   <div className="vegnonveg">
                    <p>Veg</p>
                   <label className="switch">
                   <input type="checkbox" name="veg"/>
                <span className="slider round"></span>
                 </label>
                 <p>Non-veg</p>
                 </div>
                 <button type="submit" className="pub-btn">List Dish</button>
                </Form>
            </div>
            <FooterAll/>
        </div>
    )
}

export default ListDish;

export async function action({request,params}){
    const id=params.restaurantId;
     const data=await request.formData();
     let veg=data.get('veg');
     if(veg==='on'){veg=false;}
     else veg=true;
     const authData={
        name:data.get('name'),
        price:data.get('price'),
        description:data.get('description'),
        imageCover:data.get('image'),
        veg:veg,
        restaurant:id
     }
     try{
        const jwt=Cookies.get('jwt');
        let res=await axios.post(ENDPOINT+'restaurants/protect',{token:jwt});
        res=await axios.post(ENDPOINT+'dishes/',authData);
        if(res.data.status==='success'){
            return {type:'success',msg:'Dish has been Listed!',visible:'true',id:id};
        }
     }
     catch(err){
        return {type:'error',msg:err.response.data.message,visible:'true'};
      }
}

