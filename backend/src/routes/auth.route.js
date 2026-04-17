import express from "express"
import { loginController, registerController, verifyEmailController, getMeController, resendVerifyEmailController, googleCallback } from "../controllers/auth.controller.js"
import { registerValidator, loginValidator } from "../validators/auth.validator.js"
import { authUser } from "../middlewares/auth.middleware.js"
import passport from "passport"

const authRouter = express.Router()

authRouter.post("/register" ,registerValidator, registerController)

authRouter.get("/verify-email", verifyEmailController)

authRouter.post("/resend-verify-email", resendVerifyEmailController)

authRouter.post("/login", loginValidator, loginController)

authRouter.get("/get-me", authUser, getMeController)

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

authRouter.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  googleCallback
);

export default authRouter
