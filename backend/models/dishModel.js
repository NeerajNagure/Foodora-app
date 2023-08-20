const mongoose=require('mongoose');
const Restaurant = require('./restaurantModel');

const dishSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A dish must have a name'],
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String
    },
    dishType:{
        type:String,
        default:'Others'
    },
    ratingsAvg:{
        type:Number,
        default:1,
        min:[1,'Rating should be above 1.0'],
        max:[5,'Rating should be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'A dish must have a price']
    },
    veg:{
        type:Boolean,
        required:[true,'A dish must be either veg or non-veg']
    },
    restaurant:{
        type:mongoose.Schema.ObjectId,
        ref:'Restaurant',
        required:[true,'A dish must belong to a restaurant']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

dishSchema.pre(/^find/,function(next){
    this.populate({
        path:'restaurant',
        select:'name'
    });
    next();
});


const Dish=mongoose.model('Dish',dishSchema);
module.exports=Dish;