const isValidateString = (value) => {
    return typeof value === "string" && value.trim() > 0;
}

const validateNote = (req, res, next) => {
    const { title, content } = req.body;

    if (!isValidateString(title)) {
        const err = new Error("title must be a valid string");
        err.status = 400;
        return next(err);
    }

    if (!isValidateString(content)) {
        const err = new Error("Content must be a valid string");
        err.status = 400;
        return next(err);
    }
    next();
}

const validateNotePartial = (req, res, next) => {
    const { title, content } = req.body;

    if(title === undefined && content === undefined){
        const err = new Error("At least one field required");
        err.status = 400;
        return next(err);
    }

    if(title !== undefined && !isValidateString(title)){
        const err = new Error("Title must be a valid string");
        err.status = 400;
        return next(err);
    }

    if(content !== undefined && !isValidateString(content)){
        const err = new Error("Content must be a valid string");
        err.status = 400;
        return next(err);
    }
    next();
};

module.exports = {
    validateNote,
    validateNotePartial
};