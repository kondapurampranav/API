const express = require("express");
const router = express.Router();

const {
    server,
    getAllNotes,
    getById,
    addNotes,
    updateNotes,
    deleteNotes
} = require("../controllers/notesControllers");

router.get("/", server)

router.get("/notes", getAllNotes)

router.get("/notes/:id", getById);

router.post("/notes", addNotes)

router.put("/notes/:id", updateNotes)

router.delete("/notes/:id", deleteNotes)


module.exports = router;