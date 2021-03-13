module.exports = {
    checkAccessTokenMiddleware: (req, res, next) => {
        try{
const token = req.get('Authorization');

            console.log(token);
            next();
        } catch (e){
            next(e)
        }
    }
};
