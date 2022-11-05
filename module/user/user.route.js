import { Router } from 'express';
import auth from '../../middleware/auth.js';
import validation from '../../middleware/validation.js';
import { deleteSchema, getUserSchema, ChangePasswordSchema } from './user.validation.js';
import { getUser, changePassword, deleteById, softDelete } from './controller/user.controller.js';

const router = Router();


router.get("/getuser/:id", auth(), validation(getUserSchema), getUser)
router.patch("/changePassword", auth(), validation(ChangePasswordSchema), changePassword)
router.delete("/deleteUser", auth(), validation(deleteSchema), deleteById)
router.delete("/softDelete", auth(), validation(deleteSchema), softDelete)


export default router;