const Cart=require('./../models/cartModel');
const factory=require('./handlerFactory');
const catchAsync=require('./../utils/catchAsync');

exports.getAllCartItems=catchAsync(async (req, res, next) => {
  const doc = await Cart.find({user:req.params.id, pastOrder:false});

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });
});

exports.getPastOrders=catchAsync(async (req, res, next) => {
  const doc = await Cart.find({user:req.params.id, pastOrder:true});

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });
});

exports.getCartItem=factory.getOne(Cart);
exports.addCartItem=factory.createOne(Cart);

exports.updateCartItems=catchAsync(async (req, res, next) => {
  const doc = await Cart.updateMany({user:req.params.id}, req.body);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.deleteCartItem=factory.deleteOne(Cart);