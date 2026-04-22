const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
        const err = new Error("Invalid id");
        err.status = 400;
        return next(err);
    }

    req.id = id;
    next();
};

module.exports = validateId;