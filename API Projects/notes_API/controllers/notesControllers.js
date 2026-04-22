const db = require("../config/db");


exports.server = async (req, res) => {
    res.send("Server is running");
}

exports.getAllNotes = async (req, res) => {
    try{
        const [rows] = await db.execute("SELECT * FROM NOTES");
        res.json(rows);
    } catch(err) {
        res.status(404).json({ error: err.message });
    }
} 

exports.getAllNotes = async (req, res) => {
    const { search, sort, order, page, limit} = req.query;

    let query = "SELECT * FROM notes";
    let values = [];

    if(search){
        query += " WHERE title LIKE ?";
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

    try {
        const [rows] = await db.execute(query, values);
        res.status(200).json({
            data: rows,
            page: pageNum,
            limit: limitNum,
            count: rows.length
});
    }catch(err){
        res.status(500).json({ error: err.message})
    }
}

exports.getById = async(req, res) => {
    const id = req.id;

    try{
        const [rows] = await db.execute(
            "SELECT * FROM notes WHERE id = ?", [id]
        );

        if(rows.length === 0){
        return res.status(404).json({ error: "note not found"})
    }
        res.status(200).json({
            data: rows[0]
     })
     
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
}

exports.addNotes = async(req, res) => {
    const {title, content} = req.body;

    try{
        const [result] = await db.execute(
            "INSERT INTO notes (title, content) VALUES (?, ?)", [title.trim(), content.trim()]
        );
        res.status(201).json({
            message: "Notes added",
            id: result.insertId
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
} 

exports.updateNotes = async (req, res) => {
    const id = req.id;
    const {title, content} = req.body;

    try{
        const [result] = await db.execute(
            "UPDATE notes SET title = ?,content = ? WHERE id = ?", [title.trim(), content.trim(), id]
        );
        if(result.affectedRows === 0){
            return res.status(404).json({ error: "note not found"})
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
        res.status(500).json({ error: err.message });
    }
}

exports.updateNotesPartial = async(req, res) => {
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
            return res.status(404).json({ error: "Note not found"});
        }

        const data = { id };
        if (title !== undefined) data.title = title.trim();
        if (content !== undefined) data.content = content.trim();

        res.status(200).json({
            message: "Note updated successfully",
            data: data
        })
    }catch(err) {
        res.status(500).json({ error: err.message});
    }
}

exports.deleteNotes = async (req, res) => {
    const id = req.id;

    try{
        const [result] = await db.execute(
            "DELETE FROM notes WHERE id = ?", [id]
        );
        
        if(result.affectedRows === 0){
            return res.status(404).json({ error: "note not found"})
        }
        res.status(200).json({
            message: "Note deleted successfully",
            id: id
    })
    } catch(err) {
        res.status(500).json({ error: err.message})
        }
    }
