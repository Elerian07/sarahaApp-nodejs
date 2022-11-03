import { Router } from 'express';
import auth from '../../middleware/auth.js';
import validation from '../../middleware/validation.js';
import { forgetPasswordSchema, signInSchema, sinUpSchema } from './auth.validation.js';
import { signUp, signIn, confirmEmail, forgetPassword, refresh, sendCode } from './controller/auth.controller.js';

const router = Router();


router.post("/signUp", validation(sinUpSchema), signUp)
router.post("/signIn", validation(signInSchema), signIn)
router.get("/confirmEmail/:token", confirmEmail)
router.get("/refresh/:token", refresh)
router.post("/forgetPassword", validation(forgetPasswordSchema), forgetPassword)
router.post("/sendCode", sendCode)

export default router;