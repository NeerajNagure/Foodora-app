const Restaurant=require('./../models/restaurantModel');
const catchAsync = require('./../utils/catchAsync');
const AppError=require('./../utils/appError');
const factory=require('./handlerFactory');

exports.getMe = (req, res, next) => {
    req.params.id = req.restaurant.id;
    next();
  };
  
  const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };
  
  exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
  
    const filteredBody = filterObj(req.body, 'name','username');
    if (req.file) filteredBody.photo = req.file.filename;
  
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.body.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedRestaurant
      }
    });
  });
  
  exports.rateRestaurant=catchAsync(async (req, res, next) => {
    if(req.body.rating<1||req.body.rating>5){
      return next(new AppError('Please enter valid rating',404));
    }
    const restaurant= await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return next(new AppError('No document found with that ID', 404));
    }
    const newquantity=restaurant.ratingsQuantity+1;
    const newavg=((restaurant.ratingsAverage*restaurant.ratingsQuantity)+req.body.rating)/newquantity;
    const updateInfo={
      ratingsAverage:newavg,
      ratingsQuantity:newquantity
    }
    const doc = await Restaurant.findByIdAndUpdate(req.params.id, updateInfo, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getAllRestaurants=factory.getAll(Restaurant);
exports.getRestaurant=factory.getOne(Restaurant,'dishes');
exports.updateRestaurant=factory.updateOne(Restaurant);
exports.deleteRestaurant=factory.deleteOne(Restaurant);

