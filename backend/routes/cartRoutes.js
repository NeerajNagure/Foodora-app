const express=require('express');
const cartController=require('./../controllers/cartController');
const authController=require('./../controllers/authController');

const router=express.Router();

router.route('/')
.post(cartController.addCartItem)

router.post('/protectCart',authController.protectCart);

router.route('/:id')
.delete(cartController.deleteCartItem)
.get(cartController.getAllCartItems)
.patch(cartController.updateCartItems);

router.route('/pastorders/:id')
.get(cartController.getPastOrders);

module.exports=router;