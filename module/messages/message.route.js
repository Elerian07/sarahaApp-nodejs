import { Router } from 'express';
import auth from "../../middleware/auth.js";
import validation from '../../middleware/validation.js'
import { getMessages, addMessage, deleteMessage } from './controller/message.controller.js'
import { createSchema, deleteSchema } from './message.validation.js';
const router = Router();

router.get("/", getMessages)
router.post("/add", validation(createSchema), addMessage)
router.delete("/deleteMessage/:id", validation(deleteSchema), deleteMessage)

export default router;