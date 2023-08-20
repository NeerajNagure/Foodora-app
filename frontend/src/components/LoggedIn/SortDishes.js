import { useState } from 'react';
import './DishesUser.css';

function SortDishes(props){
    const [active,setActive]=useState(['']);
    const costAscClick=async ()=>{
        setActive(['filter-btn1--active','','']);
        const dishes=[...props.Dishes];
        dishes.sort((a,b)=>{return a.price-b.price;});
        props.setDishes(dishes);
    }
    
    const costDescClick=()=>{
        setActive(['','filter-btn1--active','']);
        const dishes=[...props.Dishes];
        dishes.sort((a,b)=>{return b.price-a.price;});
        props.setDishes(dishes);
    }

    const vegClick=()=>{
        setActive(['','','filter-btn1--active']);
        const dishes=props.Dishes.filter((dish)=>{return dish.veg});
        props.setDishes(dishes);
    }
    return(
        <>
        <div className='filter1'>
        <div className='filter-txt2'>
        <img src={require('./../img/filter.png')}/>
        <div className='filter-txt3'>Filters</div>
        </div>
        <div className='sort-wrap'>
        <button className={`filter-btn1 ${active[0]}`} onClick={costAscClick}>Cost:low to high</button>
        <button className={`filter-btn1 ${active[1]}`} onClick={costDescClick}>Cost:high to low</button>
        <button className={`filter-btn1 ${active[2]}`} onClick={vegClick}>Veg Only</button>
        </div>
        </div> 
        </>
    )
}

export default SortDishes;