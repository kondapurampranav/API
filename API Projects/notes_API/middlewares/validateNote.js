const isValidateString = (value) => {
    return typeof value === "string" && value.trim();
}

const validateNote = (req, res, next) => {
    const { title, content } = req.body;

    if (!isValidString(title)) {
        return res.status(400).json({ error: "title must be a valid string"});
    }

    if (!isValidString(content)) {
        return res.status(400).json({ error: "content must be a valid string"});
    }
    next();
}

const validateNotePartial = (req, res, next) => {
    const { title, content } = req.body;

    if(title === undefined && content === undefined){
        return res.status(400).json({ error: "At least one field required"});
    }

    if(title !== undefined && !isValidateString(title)){
        return res.status(400).json({ error: "title must be a valid string"});
    }

    if(content !== undefined && !isValidateString(content)){
        return res.status(400).json({ error: "content must be a valid string"});
    }
    next();
};

module.exports = {
    validateNote,
    validateNotePartial
};