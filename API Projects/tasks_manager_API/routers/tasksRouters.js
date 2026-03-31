const express = require("express");
const router = express.Router();

const {
    info,
    getAllTasks,
    addTasks,
    updateTasks,
    updateTasksPartial,
    deleteTasks
} = require("../controllers/tasksControllers");

router.get("/", info)

router.get("/tasks", getAllTasks);

router.post("/tasks", addTasks);

router.put("/tasks/:id", updateTasks);

router.patch("/tasks/:id", updateTasksPartial);

router.delete("/tasks/:id", deleteTasks);

module.exports = router;