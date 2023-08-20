const express=require('express');
const dishController=require('./../controllers/dishController');
const authController=require('./../controllers/authController');

const router=express.Router({mergeParams:true});

router.route('/')
.get(dishController.getAllDishes)
.post(dishController.createDish);

router.route('/:id')
.get(dishController.getDish)
.patch(dishController.updateDish)
.delete(dishController.deleteDish)

module.exports=router;