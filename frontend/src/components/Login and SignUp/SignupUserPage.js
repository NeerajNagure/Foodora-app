import FooterAll from "../UI/FooterAll";
import LoginHeader from "./LoginHeader";
import './LoginSignup.css';
import { Link,Form, useActionData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import Cookies from "js-cookie";
const ENDPOINT='https://foodora-api.onrender.com'

function SignupUserPage(){
    const alert=useAlert();
    const data=useActionData();
    const navigate=useNavigate();

    if(data && data.visible==='true'){
        alert.show(`${data.msg}`,{type:data.type});
        data.visible='false';
        if(data.type==='success')
        navigate('/restaurants');
    }
    return (
        <div className="background">
            <LoginHeader/>
        <div className="signup">
        <Form method="post" >
            <div className="heading">
            <Link to="/signupUser" className="active">As a User</Link>
               <Link to="/signupRestaurant" className="inactive">As a Restaurant</Link>
            </div>
            <p className="txt">Name</p>
            <input type="text" placeholder="Enter your name" className="txtbar" name="nameuser"/>
            <p className="txt">Email</p>
            <input type="email" placeholder="Enter your email" className="txtbar" name="email"/>
            <p className="txt">Password</p>
            <input type="password" placeholder="Enter your password" className="txtbar" name="password"/>
            <p className="txt">Confirm Password</p>
            <input type="password" placeholder="Confirm your password" className="txtbar" name="passwordConfirm"/>
            <p className="txt">Address</p>
            <input type="address" placeholder="Enter your address" className="txtbar" name="address"/>
            <button type="submit" className="btn-login">Sign Up</button>
            <p className="text"><Link to="/loginUser">Already have an account?</Link></p>
        </Form>
    </div>
    <FooterAll/>
    </div>
    )
}

export default SignupUserPage;

export async function action({request,params}){
    const data=await request.formData();
     const authData={
        name:data.get('nameuser'),
        email:data.get('email'),
        password:data.get('password'),
        passwordConfirm:data.get('passwordConfirm'),
        address:data.get('address')
     }
     try{
     const res=await axios.post(ENDPOINT+'users/signup',authData);
            if(res.data.status==='success'){
                Cookies.set('jwt',res.data.token,{expires:new Date(
                    Date.now() +  24 * 60 * 60 * 1000
                  )});
                return {type:'success',msg:'Account Created Successfully!',visible:'true'};
            }
        }
        catch(err){
            return {type:'error',msg:err.response.data.message,visible:'true'};
        }
}