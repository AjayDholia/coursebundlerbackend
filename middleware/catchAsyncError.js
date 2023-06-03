export const catchAsyncError = (passesFunction) => (req, res, next) => {
    // console.log('req',req.body);
    Promise.resolve(passesFunction(req, res, next)).catch(next);
}