const AppError=require('./../utils/appError');

const handleCastErrorDB=err=>{
  const message=`Invalid ${err.path}:${err.value}`;
  return new AppError(message,400);
}
const handleDuplicateFields=err=>{
  const value=err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message=`Duplicate field value :${value}`;
  return new AppError(message,400);
}
const handleValidationError=error=>{
  
}
const handleJWTError=()=>{
  new AppError('invalid code',401);
}

const sendErrorDev=(err,req,res)=>{
  // API
  if(req.originalUrl.startsWith('/api')){
  return res.status(err.statusCode).json({
    status:err.status,
    error:err,
    message:err.message,
    stack:err.stack
  });
} 
  // Rendered website
  return res.status(err.statusCode).render('error',{
    title:'Something went wrong',
    msg:err.message
  })
}

const sendErrorProd=(err,req,res)=>{
  // API
  if(req.originalUrl.startsWith('/api')){
  if(err.isOperational){
  return res.status(err.statusCode).json({
    status:err.status,
    message:err.message,
  });
}
  console.error('ERROR',err);
  return res.status(500).json({
    status:'error',
    message:'Something went wrong'
  })
}
// Rendered error
  if(err.isOperational){
   return res.status(err.statusCode).render('error',{
      title:'Something went wrong',
      message:err.message,
    });
  } 
    console.error('ERROR',err);
   return res.status(500).render('error',{
      title:'Something went wrong',
      msg:'Please try again later'
    })
};


module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';

      if(process.env.NODE_ENV==='development'){
        sendErrorDev(err,req,res);
      } 
      else if(process.env.NODE_ENV==='production'){
        let error={...err};
        error.message=err.message;
      if(error.name==='CastError'){
        error=handleCastErrorDB(error);  
      }
      if(error.code===1100) error=handleDuplicateFields(error);
      if(error.name==='ValidationError') error=handleValidationError(error);
      if(error.name==='JsonWebTokenError') error=handleJWTError();
      sendErrorProd(error,req,res);
      }
  }