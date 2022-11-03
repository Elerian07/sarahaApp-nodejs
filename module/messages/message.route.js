import { Router } from 'express';
import auth from "../../middleware/auth.js";
import validation from '../../middleware/validation.js'
import { getMessages } from './controller/message.controller.js'
import { } from './message.validation.js';
const router = Router();

router.get("/", getMessages)

export default router;