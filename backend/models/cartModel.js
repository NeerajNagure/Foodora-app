const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A dish must have a name'],
    },
    price:{
        type:Number,
        required:[true,'A dish must have a price']
    },
    imageCover:{
        type:String
    },
    quantity:{
        type:Number,
        required:[true,'Quantity of an item must be specified'],
        default:1
    },
    pastOrder:{
        type:Boolean,
        required:true,
        default:false
    },
    pastOrderDate:{
        type:String
    },
    veg:{
        type:Boolean,
        required:[true,'A cart item must be either veg or not']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'A cart item must belong to a user']
    },
    dish:{
        type:mongoose.Schema.ObjectId,
        ref:'Dish',
        required:[true,'A cart item must have a dish reference']
    },
    restaurant:{
       type:mongoose.Schema.ObjectId,
       ref:'Restaurant',
       required:[true,'A cart item must have a restaurant reference']  
    }
});

cartSchema.pre(/^find/,function(next){
    this.populate({
        path:'restaurant',
        select:'name address description'
    });
    next();
})


const Cart=mongoose.model('Cart',cartSchema);
module.exports=Cart;