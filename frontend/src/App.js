import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './components/HomePage';
import CartPage,{loader as cartLoader} from './components/LoggedIn/CartPage';
import DishesUser,{loader as dishLoader} from './components/LoggedIn/DishesUser';
import ListDish,{action as dishAction} from './components/LoggedIn/ListDish';
import RestaurantLoggedIn,{loader as restaurantDishLoader} from './components/LoggedIn/RestaurantLoggedIn';
import UserLoggedIn,{loader as restaurantLoader} from './components/LoggedIn/UserLoggedIn';
import LoginRestaurantPage,{action as loginRestaurantAction} from './components/Login and SignUp/LoginRestaurantPage';
import LoginUserPage,{action as loginAction} from './components/Login and SignUp/LoginUserPage';
import SignupRestaurantPage,{action as signupRestaurantAction} from './components/Login and SignUp/SignupRestaurantPage';
import SignupUserPage,{action as signupAction} from './components/Login and SignUp/SignupUserPage';
import RootLayout from './components/UI/RootLayout';
import ErrorPage from './components/UI/ErrorPage';
import UserAccount,{loader as UserAccountLoader} from './components/Account/UserAccount';
import RestaurantAccount,{loader as RestaurantAccountLoader} from './components/Account/RestaurantAccount';
import UserPastOrders from './components/Account/UserPastOrders';

const router=createBrowserRouter([
  {path:'/',
   element:<RootLayout/>,
   errorElement:<ErrorPage />,
   children:[
  {path:'/',element:<Homepage/>},
  {path:'/error',element:<ErrorPage/>},
  {path:'/loginUser',element:<LoginUserPage/>,action:loginAction},
  {path:'/loginRestaurant',element:<LoginRestaurantPage/>,action:loginRestaurantAction},
  {path:'/signupUser',element:<SignupUserPage/>,action:signupAction},
  {path:'/signupRestaurant',element:<SignupRestaurantPage/>,action:signupRestaurantAction},
  {path:'/restaurants',element:<UserLoggedIn/>,
  loader:restaurantLoader},
  {path:'/:restaurantId',element:<RestaurantLoggedIn/>,loader:restaurantDishLoader},
  {path:'/restaurants/:restaurantId',element:<DishesUser/>,loader:dishLoader},
  {path:'/:restaurantId/ListDish',element:<ListDish/>,action:dishAction},
  {path:'/restaurants/:userId/cart',element:<CartPage/>,loader:cartLoader},
  {path:'/userAccount/:userId/settings',element:<UserAccount/>,loader:UserAccountLoader},
  {path:'/restaurantAccount/:restaurantId',element:<RestaurantAccount/>,loader:RestaurantAccountLoader},
  {path:'/userAccount/:userId/pastorders',element:<UserPastOrders/>}
   ]
  }
])

function App() {
  return(
    <>
    <RouterProvider router={router}/>
   </>
  )
}

export default App;
