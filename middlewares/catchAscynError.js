
export const catchAsyncErrors=(theFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(theFunction(req, res, next)).catch(next);
    }
}
// When an asynchronous function (like fetching data from a database) fails, the error is automatically passed to the next() function by catchAsyncError.
// next() sends the error to the errorMiddleware.