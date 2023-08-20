import './Account.css';
import RateForm from './RateForm';

const UserPastOrders=(props)=>{
    const pastorders=props.pastorders;
    
    return (
        <div className="main-nav">
          <p className="heading-5">Past Orders</p>
          <ul className='porder-container'>
          {
            pastorders.map((item,index)=>(
                <li key={index} className='porder-item'>
                  <div className='porder-container-2'>
                  <img src={item.imageCover} alt=""/>
                  <div className='porder-info'>
                  <p className='porder-name'>{item.name}</p>
                  <p className='porder-rest'>{item.restaurant.name}</p>
                  <p className='porder-price'>Rs.{item.price}</p>
                  <p className='porder-rest'>Ordered on {item.pastOrderDate}</p>
                  </div>
                  </div>
                  <RateForm index={index} pastorder={item}/>
                </li>
            ))
          }
          </ul>
        </div>
    )
}

export default UserPastOrders;