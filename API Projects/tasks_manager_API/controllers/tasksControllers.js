const tasks = require("../data/tasks");

exports.info = (req, res) => {
    res.send("server is running");
}

// GET
exports.getAllTasks = (req, res) => {
    res.json(tasks)
}

// POST
exports.addTasks = (req, res) => {
    const { id, title, completed, priority } = req.body;


    if(id === undefined || title === undefined || completed === undefined || priority === undefined){
        return res.status(400).json({ error: "All fields are required"})
    }
    const idNum = Number(id)
    if(isNaN(idNum)){
        return res.status(400).json({ error: "id must be a number"});
    }

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Invalid title" });
    }

    if(typeof completed !== "boolean"){
        return res.status(400).json({ error: "Completed must be boolean"})
    }

    if (typeof priority !== "string" || !priority.trim()) {
        return res.status(400).json({ error: "Invalid priority" });
    }

    if(priority !== "high" && priority !== "medium" && priority !== "low" ){
        return res.status(400).json({ error: "Invalid priority value"})
    }


    const exists = tasks.find(u => u.id === idNum);

    if(exists){
        return res.status(400).json({ error: "Task already exists"});
    }

    tasks.push({ id: idNum, title: title.trim(), completed, priority: priority.trim()});

    res.status(201).json({ message: "Task added" })

}

exports.updateTasks = (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({ error: "id must be a number"});
    }

    const {title, completed, priority} = req.body;

    const task = tasks.find(u => u.id === id);

    if(!task){
        return res.status(404).json({ error: "Task not found"});
    }

    if(title === undefined || completed === undefined || priority === undefined){
        return res.status(400).json({ error: "All fields are required"})
    }

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Invalid title" });
    }

    if(typeof completed !== "boolean"){
        return res.status(400).json({ error: "Completed must be boolean"})
    }

    if (typeof priority !== "string" || !priority.trim()) {
        return res.status(400).json({ error: "Invalid priority" });
    }

    if(priority !== "high" && priority !== "medium" && priority !== "low" ){
        return res.status(400).json({ error: "Invalid priority value"})
    }

    task.title = title;
    task.completed = completed;
    task.priority = priority;

    res.status(200).json({ 
        message: "Task updated",
        task
    })

}


exports.updateTasksPartial = (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({ error: "id must be a number"});
    }

    const updates = req.body;

    const task = tasks.find(u => u.id === id);

    if(!task){
        return res.status(404).json({ error: "Task not found"});
    }

    if(Object.keys(updates).length === 0){
        return res.status(400).json({ error: "No data provided" });
    }

    if(updates.title !== undefined){
        if (typeof updates.title !== "string" || !updates.title.trim()) {
            return res.status(400).json({ error: "Invalid title" });
        }

        task.title = updates.title;
    }
    
    if(updates.completed !== undefined){
        if(typeof updates.completed !== "boolean"){
            return res.status(400).json({ error: "Completed must be boolean"})
        }
        task.completed = updates.completed;
    }
    
    if(updates.priority !== undefined){
        if (typeof updates.priority !== "string" || !updates.priority.trim()) {
            return res.status(400).json({ error: "Invalid priority" });
        }

        if(updates.priority !== "high" && updates.priority !== "medium" && updates.priority !== "low" ){
            return res.status(400).json({ error: "Invalid priority value"})
        }
        
        task.priority = updates.priority;

    }

    res.status(200).json({ 
        message: "Task updated",
        task
    })

}


exports.deleteTasks = (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({ error: "id must be a number"});
    }

    const index = tasks.findIndex(u => u.id === id);

    if(index === -1){
        return res.status(404).json({ error: "No Tasks found"})
    }

    const deletetask = tasks.splice(index, 1);

    res.status(200).json({ 
        message: "Task deleted",
        task: deletetask
    })

}
