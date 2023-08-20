const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Restaurant=require('./../models/restaurantModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Cart=require('./../models/cartModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (doc, statusCode, req, res) => {
  const token = signToken(doc._id);
  doc.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      doc
    }
  });
};

exports.signupUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    address:req.body.address,
  });
  createSendToken(newUser, 201, req, res);
});

exports.signupRestaurant=catchAsync(async(req,res,next)=>{
  const newRestaurant=await Restaurant.create(req.body);
  createSendToken(newRestaurant,201,req,res);
})

exports.loginUser=catchAsync(async(req,res,next)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createSendToken(user, 200, req, res);
})

exports.loginRestaurant=catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400));
  }
  const restaurant = await Restaurant.findOne({ username }).select('+password');
  if (!restaurant || !(await restaurant.correctPassword(password, restaurant.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  createSendToken(restaurant, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};


exports.protect = catchAsync(async (req, res, next) => {
  let token=req.body.token;
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        `The user belonging ${decoded._id} to this token does no longer exist.`,
        401
      )
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  res.status(200).json({
    status:'success',
    id:currentUser.id
  });
});

exports.protectRestaurant=catchAsync(async (req, res, next) => {
  let token=req.body.token;
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentRestaurant = await Restaurant.findById(decoded.id);
  if (!currentRestaurant) {
    return next(
      new AppError(
        'The restaurant belonging to this token no longer exist.',
        401
      )
    );
  }
  if (currentRestaurant.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('This restaurant recently changed its password! Please log in again.', 401)
    );
  }
  res.status(200).json({
    status:'success'
  })
});

exports.protectCart=catchAsync(async(req,res,next)=>{
  const cartItems=await Cart.find({user:req.body.userId,dish:req.body.dishId,pastOrder:false});
  if(cartItems.length!=0){
    return next(
      new AppError('Item has been already added to the cart',401)
    );
  }
  res.status(200).json({
    status:'success',
    data:{cartItems}
  })
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.id).select('+password');
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, req,res);
});

exports.updateRestaurantPassword = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.body.id).select('+password');
  if (!(await restaurant.correctPassword(req.body.passwordCurrent, restaurant.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  restaurant.password = req.body.password;
  restaurant.passwordConfirm = req.body.passwordConfirm;
  await restaurant.save();
  createSendToken(restaurant, 200, req,res);
});