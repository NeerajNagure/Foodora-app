import FooterAll from "../UI/FooterAll";
import LoginHeader from "./LoginHeader";
import './LoginSignup.css';
import axios from "axios";
import { Link,Form, useNavigate, useActionData } from "react-router-dom";
import Cookies from "js-cookie";
import { useAlert } from "react-alert";
const ENDPOINT='https://foodora-api.onrender.com/'

function LoginRestaurantPage(){
    const navigate=useNavigate();
    const alert=useAlert();
    const data=useActionData();
    if(data && data.visible==='true'){
        alert.show(`${data.msg}`,{type:data.type});
        data.visible='false';
        if(data.type==='success')
        navigate(`/${data.id}`);
    }

    return(
        <div className="background">
            <LoginHeader/>
        <div className="signup">
        <Form method="post" >
            <div className="heading">
            <Link to="/loginUser" className="inactive">As a User</Link>
               <Link to="/loginRestaurant" className="active">As a Restaurant</Link>
            </div>
            <p className="txt">Username</p>
            <input type="text" placeholder="Enter your username" className="txtbar" name="username"/>
            <p className="txt">Password</p>
            <input type="password" placeholder="Enter your password" className="txtbar" name="password"/>
            <button type="submit" className="btn-login">Login</button>
            <p className="text"><Link to="/signupRestaurant">Don't have an account?</Link></p>
        </Form>
    </div>
    <FooterAll/>
    </div>
    )
}

export default LoginRestaurantPage;

export async function action({request,params}){
    const data=await request.formData();
    const authData={
       username:data.get('username'),
       password:data.get('password')
    }
    try{
    const res=await axios.post(ENDPOINT+'restaurants/login',authData);
           if(res.data.status==='success'){
            Cookies.set('jwt',res.data.token,{expires:new Date(
                Date.now() +  24 * 60 * 60 * 1000
              )});
            const id=res.data.data.doc.id;
            return {type:'success',msg:'Logged In Successfully!',visible:'true',id:id};
           }
       }
       catch(err){
        return {type:'error',msg:err.response.data.message,visible:'true'};
       }
           
}