const db = require("../config/db");
const ApiError = require("../../../utils/ApiError");
const asyncHandler = require("../../../utils/asyncHandler");

exports.server = async (req, res) => {
    res.send("Server is running");
}

exports.getAllNotes = asyncHandler(async(req, res, next) => {
    const { search, sort, order, page, limit} = req.query;

    let query = "SELECT * FROM notes WHERE user_id = ?";
    let values = [req.userId];

    if(search){
        query += " AND title LIKE ?";
        values.push(`%${search}%`)
    }

    const allowedSort = ["created_at", "title"];

    if(sort && allowedSort.includes(sort)){
        query += ` ORDER BY ${sort}`;
    }
    else {
        query += " ORDER BY created_at";
    }

    const allowedOrder = ["ASC", "DESC"]

    let orderValue = "ASC";
    if(order && allowedOrder.includes(order.toUpperCase())){
        orderValue = order.toUpperCase();
        query += ` ${orderValue}`;
    }

    let pageNum = Number(page);
    let limitNum = Number(limit);

    if(!pageNum || pageNum < 1) pageNum = 1;
    if(!limitNum || limitNum < 1) limitNum = 5;

    let offset = (pageNum - 1) * limitNum;

    query += ` LIMIT ${limitNum} OFFSET ${offset}`;

    // console.log(query);
    // console.log(values);
        const [rows] = await db.execute(query, values);
        res.status(200).json({
            data: rows,
            page: pageNum,
            limit: limitNum,
            count: rows.length
});
});

exports.getById = async(req, res, next) => {
    const id = req.id;

    try{
        const [rows] = await db.execute(
            "SELECT * FROM notes WHERE id = ? AND user_id = ?", [id, req.userId]
        );

        if(rows.length === 0){
            throw new ApiError(404, "Note not found");
    }
        res.status(200).json({
            data: rows[0]
     })
     
    } catch(err) {
        next(err);
    }
}

exports.addNotes = async(req, res, next) => {
    const {title, content} = req.body;

    try{
        const [result] = await db.execute(
            "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)", [title.trim(), content.trim(), req.userId]
        );
        res.status(201).json({
            message: "Notes added",
            id: result.insertId
        });
    } catch(err) {
        next(err);
    }
} 

exports.updateNotes = async (req, res, next) => {
    const id = req.id;
    const {title, content} = req.body;

    try{
        const [result] = await db.execute(
            "UPDATE notes SET title = ?,content = ? WHERE id = ? AND user_id = ?", [title.trim(), content.trim(), id, req.userId]
        );
        if(result.affectedRows === 0){
            const err = new Error("Note not found");
            err.status = 404;
            return next(err);
        }
        res.status(200).json({
            message: "Note updated successfully",
            data: {
            id: id,
            title: title.trim(),
            content: content.trim()
            }
        })
    }catch(err) {
        next(err);
    }
}

exports.updateNotesPartial = async(req, res, next) => {
    const id = req.id;
    const { title, content } = req.body;

    let fields = []
    let values = []

    if(title !== undefined){
        fields.push("title = ?")
        values.push(title.trim())
    }

    if(content !== undefined){
        fields.push("content = ?")
        values.push(content.trim())
    }
    let query = `UPDATE notes SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    try{
        const [result] = await db.execute(query, values);

        if(result.affectedRows === 0){
            const err = new Error("Note not found");
            err.status = 404;
            return next(err);
        }

        const data = { id };
        if (title !== undefined) data.title = title.trim();
        if (content !== undefined) data.content = content.trim();

        res.status(200).json({
            message: "Note updated successfully",
            data: data
        })
    }catch(err) {
        next(err);
    }
}

exports.deleteNotes = async (req, res, next) => {
    const id = req.id;

    try{
        const [result] = await db.execute(
            "DELETE FROM notes WHERE id = ? AND user_id = ?", [id, req.userId]
        );
        
        if(result.affectedRows === 0){
            const err = new Error("Note not found");
            err.status = 404;
            return next(err);
        }
        res.status(200).json({
            message: "Note deleted successfully",
            id: id
    })
    } catch(err) {
        next(err);
        }
    }
