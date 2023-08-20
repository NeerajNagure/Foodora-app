import FooterAll from "../UI/FooterAll";
import LoginHeader from "./LoginHeader";
import { Link,Form, useNavigate, useActionData } from "react-router-dom";
import axios from "axios";
import './LoginSignup.css';
import { useAlert } from "react-alert";
import Cookies from "js-cookie";
const ENDPOINT='https://foodora-api.onrender.com/'

function SignupRestaurantPage(){
    const alert=useAlert();
    const navigate=useNavigate();
    const data=useActionData();
    if(data && data.visible==='true'){
        alert.show(`${data.msg}`,{type:data.type});
        data.visible='false';
        if(data.type==='success')
        navigate(`/${data.id}`);
    }
    return (
        <div className="background">
            <LoginHeader/>
        <div className="signup">
        <Form method="post" >
            <div className="heading">
            <Link to="/signupUser" className="inactive">As a User</Link>
               <Link to="/signupRestaurant" className="active">As a Restaurant</Link>
            </div>
            <p className="txt">Name of the Restaurant *</p>
            <input type="text" placeholder="Enter name of the restaurant"
             className="txtbar" name="name"/>
            <p className="txt">Username *</p>
            <input type="text" placeholder="Enter username of restaurant"
             className="txtbar" name="username"/>
            <p className="txt">Password *</p>
            <input type="password" placeholder="Enter your password"
             className="txtbar" name="password"/>
            <p className="txt">Confirm Password *</p>
            <input type="password" placeholder="Confirm your password"
             className="txtbar" name="passwordConfirm"/>
            <p className="txt">Address of the Restaurant *</p>
            <input type="address" placeholder="Enter address of the restaurant"
             className="txtbar" name="address"/>
             <p className="txt">Image Cover of Restaurant</p>
             <input type="text" placeholder="Enter the link for image cover"
             className="txtbar" name="image"/>
             <p className="txt">Approximate price of the meal for two persons</p>
             <input type="number" placeholder="Enter the approx price"
             className="txtbar" name="price"/>
             <p className="txt">Type of Restaurant *</p>
             <input type="text" placeholder="Enter the type of dishes in restaurant"
             className="txtbar" name="description"/>
            <button type="submit" className="btn-login">Sign Up</button>
            <p className="text"><Link to="/loginRestaurant">Already have an account?</Link></p>
            <p className="terms">* indicates required fields</p>
        </Form>
    </div>
    <FooterAll/>
    </div>
    )
}

export default SignupRestaurantPage;

export async function action({request,params}){
    const data=await request.formData();
     const authData={
        name:data.get('name'),
        username:data.get('username'),
        password:data.get('password'),
        passwordConfirm:data.get('passwordConfirm'),
        address:data.get('address'),
        description:data.get('description'),
        imageCover:data.get('image'),
        approxPrice:data.get('price')
     }
     try{
     const res=await axios.post(ENDPOINT+'restaurants/signup',authData);
            if(res.data.status==='success'){
                Cookies.set('jwt',res.data.token,{expires:new Date(
                    Date.now() +  24 * 60 * 60 * 1000
                  )});
                  const id=res.data.data.doc.id;
                return {type:'success',msg:'Account Created Successfully!',visible:'true',id:id};
            }
        }
        catch(err){
            return {type:'error',msg:err.response.data.message,visible:'true'};
        }
}