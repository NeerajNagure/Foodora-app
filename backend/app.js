const express = require('express');
const restaurantRoutes=require('./routes/restaurantRoutes');
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/userRoutes');
const cartRoutes=require('./routes/cartRoutes');
const dishRoutes=require('./routes/dishRoutes');
const morgan = require('morgan');
const globalErrorHandler=require('./controllers/errorController');
const cors=require('cors');

const app = express();
app.use(cookieParser());
app.use(cors({credentials:true,origin:true}));
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/restaurants',restaurantRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/dishes',dishRoutes);
app.use('/api/v1/cartItems',cartRoutes);

app.use(globalErrorHandler);
module.exports = app;