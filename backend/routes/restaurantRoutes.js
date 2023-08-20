const express=require('express');
const restaurantController=require('./../controllers/restaurantController');
const authController=require('./../controllers/authController');
const dishRoutes=require('./dishRoutes');

const router=express.Router();

router.post('/login', authController.loginRestaurant);
router.post('/signup',authController.signupRestaurant);
router.post('/protect',authController.protectRestaurant);
router.get('/logout', authController.logout);
router.use('/:restaurantId/dishes',dishRoutes);

router.patch('/updateMe',restaurantController.updateMe);
router.patch('/updateMyPassword',authController.updateRestaurantPassword);
router.get('/me',authController.protectRestaurant,
restaurantController.getMe,
restaurantController.getRestaurant);

router.route('/')
.get(restaurantController.getAllRestaurants)

router.route('/:id')
.get(restaurantController.getRestaurant)

router.patch('/updateRatings/:id',restaurantController.rateRestaurant);

module.exports=router;