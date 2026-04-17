import express from "express"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import morgan from 'morgan'
import chatRouter from "./routes/chat.routes.js"
import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials:true
}))
app.use(morgan("dev"))

app.use(passport.initialize());


// Passport Strategy configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL || "http://localhost:3000"}/api/auth/google/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));


app.use('/api/auth',authRouter)
app.use('/api/chat',chatRouter)


export default app