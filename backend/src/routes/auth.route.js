import express from "express"
import { loginController, registerController, verifyEmailController, getMeController, resendVerifyEmailController } from "../controllers/auth.controller.js"
import { registerValidator, loginValidator } from "../validators/auth.validator.js"
import { authUser } from "../middlewares/auth.middleware.js"

const authRouter = express.Router()

authRouter.post("/register" ,registerValidator, registerController)

authRouter.get("/verify-email", verifyEmailController)

authRouter.post("/resend-verify-email", resendVerifyEmailController)

authRouter.post("/login", loginValidator, loginController)

authRouter.get("/get-me", authUser, getMeController)

export default authRouter
