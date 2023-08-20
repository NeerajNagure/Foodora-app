const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const slugify=require('slugify');
const bcrypt = require('bcryptjs');

const restaurantSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,'A restaurant must have a name'],
    trim:true
},
username:{
    type:String,
    required:[true,'A restaurant must have a username'],
    unique:true
},
slug:String,
password:{
    type:String,
    required:[true,'Please provide the password'],
    minlength:8,
    select: false
},
passwordConfirm:{
    type:String,
    required:[true,'Please confirm the password'],
    validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
},
address:{
  type:String,
  trim:true
},
description:{
    type:String,
    trim:true
},
ratingsAverage:{
    type:Number,
    default:1,
    min:[1,'Rating should be above 1'],
    max:[5,'Rating should be below 5'],
    set: val => Math.round(val * 10) / 10
},
ratingsQuantity: {
    type: Number,
    default: 0
  },
approxPrice:{
  type:Number,
  default:150
},
imageCover: {
    type: String,
},
passwordChangedAt: Date,
active: {
  type: Boolean,
  default: true,
  select: false
}
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

restaurantSchema.pre('save',function(next){
  this.slug=slugify(this.name,{lower:true});
  next();
  });

restaurantSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  });
  
  restaurantSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });

  restaurantSchema.virtual('dishes',{
    ref:'Dish',
    foreignField:'restaurant',
    localField:'_id'
  })
  
  restaurantSchema.pre(/^find/, function(next) {
    this.find({ active: { $ne: false } });
    next();
  });
  
  restaurantSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  restaurantSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  };

const Restaurant=mongoose.model('Restaurant',restaurantSchema);
module.exports=Restaurant;