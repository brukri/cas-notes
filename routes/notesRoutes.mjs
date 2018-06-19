import express from 'express';
import {notesController} from '../controller/notesController';

const router = express.Router();

router.get("/", notesController.getNotes.bind(notesController));
router.post("/", notesController.addNote.bind(notesController));
router.post("/:id/", notesController.updateNote.bind(notesController));

export const notesRoutes = router;