import FooterAll from "../UI/FooterAll";
import LoginHeader from "./LoginHeader";
import { Link,Form, useActionData, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import './LoginSignup.css';
import { useAlert } from "react-alert";
const ENDPOINT='http://127.0.0.1:7000/api/v1/'

function LoginUserPage(){
    const data=useActionData();
    const navigate=useNavigate();
    const alert=useAlert();
    if(data && data.visible==='true'){
        alert.show(`${data.msg}`,{type:data.type});
        data.visible='false';
        if(data.type==='success')
        navigate('/restaurants');
    }

    return(
        <div className="background">
        <LoginHeader/>
        <div className="signup">
        <Form method="post">
            <div className="heading">
               <Link to="/loginUser" className="active">As a User</Link>
               <Link to="/loginRestaurant" className="inactive">As a Restaurant</Link>
            </div>
            <p className="txt">Email</p>
            <input type="email" placeholder="Enter your email"
             className="txtbar" name="email"/>
            <p className="txt">Password</p>
            <input type="password" placeholder="Enter your password" 
            className="txtbar" name="password"/>
            <button type="submit" className="btn-login">Login</button>
            <p className="text"><Link to="/signupUser">Don't have an account?</Link></p>
        </Form>
    </div>
    <FooterAll/>
    </div>
    )
}

export default LoginUserPage;

export async function action({request,params}){
     const data=await request.formData();
     const authData={
        email:data.get('email'),
        password:data.get('password')
     }
     try{
     const res=await axios.post(ENDPOINT+'users/login',authData);
            if(res.data.status==='success'){
                Cookies.set('jwt',res.data.token,{expires:new Date(
                    Date.now() +  24 * 60 * 60 * 1000
                  )});
                return {type:'success',msg:'Logged In Successfully!',visible:'true'};
            }
        }
        catch(err){
                return {type:'error',msg:err.response.data.message,visible:'true'};
        }
            
}