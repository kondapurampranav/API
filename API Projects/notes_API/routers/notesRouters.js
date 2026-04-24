const express = require("express");
const router = express.Router();

const validateId = require("../middlewares/validateId");
const {
    server,
    getAllNotes,
    getById,
    addNotes,
    updateNotes,
    updateNotesPartial,
    deleteNotes
} = require("../controllers/notesControllers");
const { validateNote, validateNotePartial} = require("../middlewares/validateNote");

router.get("/", server);

router.get("/notes", getAllNotes);

router.get("/notes/:id", validateId, getById);

router.post("/notes", validateNote, addNotes);

router.put("/notes/:id", validateId, validateNote, updateNotes);

router.patch("/notes/:id", validateId, validateNotePartial, updateNotesPartial);

router.delete("/notes/:id", validateId, deleteNotes);


module.exports = router;