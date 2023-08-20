import LoggedInHeader from "../LoggedIn/LoggedInHeader";
import FooterAll from "../UI/FooterAll";
import './Account.css';
import Cookies from "js-cookie";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import SideNav from "./SideNav";
const ENDPOINT='https://foodora-api.onrender.com'

function UserAccount(){
    const data=useLoaderData();

    return(
    <div>
    <LoggedInHeader/>
    <div className="container-5">
        <SideNav type="user" first="side-nav--active" user={data.user} pastorders={data.pastorders}/>
    </div>
    <FooterAll/>
    </div>
    );
}

export default UserAccount;

export async function loader(){
    try{
    const jwt=Cookies.get('jwt');
    let res=await axios.post(ENDPOINT+'users/protect',{token:jwt});
    const userid=res.data.id;
    res=await axios.get(ENDPOINT+'users/'+userid);
    const res2=await axios.get(ENDPOINT+'cartItems/pastorders/'+userid);
    const data={user:res.data.data.data,
                pastorders:res2.data.data.data};
    if(res.data.status==='success'){
       return data;
    }
    }
    catch(err){
        throw json({message:err.response.data.message},{status:401});
    }
}