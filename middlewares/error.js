class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message) //inherit
        this.statusCode=statusCode
    }
}
export const errorMiddleware=(err,req,res,next)=>{
err.message=err.message || 'internal Server Error';//default
err.statusCode=err.statusCode || 500//default
// err.name =>type of error
if(err.name==='CaseError'){ // Searching for a user with an invalid userId.
    const message=`Resource not found. Invalid ${err.path}`
    err=new ErrorHandler(message,400)
}
if(err.name===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
    err=new ErrorHandler(message,400)
}
if(err.name==='JsonWebTokenError'){
    const message=`JsonWebToken is Invalid. Please try again`
    err=new ErrorHandler(message,400)
}
if(err.name==='TokenExpiredError'){
    const message=`JsonWebToken is expired. Try again`
    err=new ErrorHandler(message,400)
}
return res.status(err.statusCode).json({//changing adding err.statusCode
    success : false,
    message: err.message
})
}
export default ErrorHandler;
// what's happening here:
// so basically there is a class of Error to deal with message and another class of ErrorHandler (custom class for statusCode) a constructor for message and status code. super(to inherit message). 
// in the next part: errorMiddleware is a special middleware for handling errors. setting default values for message and status codes. then identifying error type and returing custom message and status code. reponse is  in the form of json where success is false and message is given as customed
// he err parameter in the error-handling middleware does contain err.name (along with other error properties)