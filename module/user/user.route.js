import { Router } from 'express';
import auth from '../../middleware/auth.js';
import validation from '../../middleware/validation.js';
import { deleteSchema, getUserSchema, ChangePasswordSchema } from './user.validation.js';
import { getUser, changePassword, deleteById, softDelete, profilePic } from './controller/user.controller.js';
import { myMulter, HM, validationType } from '../../service/multer.js'
const router = Router();


router.get("/getuser/:id", auth(), validation(getUserSchema), getUser)
router.patch("/changePassword", auth(), validation(ChangePasswordSchema), changePassword)
router.delete("/deleteUser", auth(), validation(deleteSchema), deleteById)
router.delete("/softDelete", auth(), validation(deleteSchema), softDelete)
router.get("/profilePic", auth(), myMulter(validationType.Image, "user/profile").single("image"), HM, profilePic)

export default router;