import './Account.css';
import { useState } from 'react';
import UserSettings from './UserSettings';
import UserPastOrders from './UserPastOrders';

function SideNav(props){
   const [sidelink,setSidelink]=useState(1);
   const [active,setActive]=useState(['side-nav--active','','','']);
    return(
        <>
        <div className='user-view__menu'>
        {
            props.type==='user' ?
            <ul className="side-nav">
            <li className={active[0]}>
            <a href='#' onClick={()=>{setSidelink(1);
            setActive(['side-nav--active','','','']);}}>
            <img src={require('./../img/settings.png')}/>Settings</a></li>
            <li className={active[1]}>
            <a href='#' onClick={()=>{setSidelink(2);
            setActive(['','side-nav--active','','']);}}>
            <img src={require('./../img/location.png')}/>Track My Order</a></li>
            <li className={active[2]}>
            <a href="#" onClick={()=>{setSidelink(3);
            setActive(['','','side-nav--active','']);}}>
            <img src={require('./../img/review.png')}/>My Reviews</a></li>
            <li className={active[3]}>
            <a href="#" onClick={()=>{setSidelink(4);
            setActive(['','','','side-nav--active']);}}>
            <img src={require('./../img/order.png')}/>Past Orders</a></li>
            </ul> 
             :
            <ul className="side-nav">
            <li className={props.first}><a href="#">
            <img src={require('./../img/settings.png')}/>Settings</a></li>
            <li className={props.second}><a href="#"><img src={require('./../img/manage.png')}/>Manage Orders</a></li>
            <li className={props.third}><a href='#' onClick={()=>{setSidelink(3);}}>
            <img src={require('./../img/revstats.png')}/>Revenue Stats</a></li>
            <li className={props.fourth}><a href="#" onClick={()=>{setSidelink(4);}}>
            <img src={require('./../img/reststat.png')}/>Restaurant Stats</a></li>
            </ul>
        }
        </div>
        {
            (sidelink===1 && props.type==='user' &&
            <UserSettings user={props.user}/>)
            ||
            (
                sidelink===4 && props.type==='user' &&
                <UserPastOrders pastorders={props.pastorders}/>
            )
        }
        </>
    )
}

export default SideNav;