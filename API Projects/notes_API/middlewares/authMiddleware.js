const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header){
        const err = new Error("Token not found");
        err.status = 404;
        return next(err);
    }

    const parts = header.split(" ");

    if(parts.length !== 2 || parts[0] !== "Bearer"){
        const err = new Error("Invalid token format");
        err.status = 401;
        return next(err);
    }

    const token = parts[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        next();
    }catch (err){
        err.status = 401;
        return next(err);
    }


}