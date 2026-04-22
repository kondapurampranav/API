const express = require("express");
const router = express.Router();

const validateId = require("../middlewares/validateId");
const ()
const {
    server,
    getAllNotes,
    getById,
    addNotes,
    updateNotes,
    updateNotesPartial,
    deleteNotes
} = require("../controllers/notesControllers");

router.get("/", server);

router.get("/notes", getAllNotes);

router.get("/notes/:id", validateId, getById);

router.post("/notes", addNotes);

router.put("/notes/:id", validateId,updateNotes);

router.patch("/notes/:id", validateId, updateNotesPartial);

router.delete("/notes/:id", validateId, deleteNotes);


module.exports = router;