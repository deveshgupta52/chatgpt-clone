import UserModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"
import { welcomeEmailTemplate } from "../templates/welcomeEmail.js"


export const registerController = async (req, res) => {
   
    const {username,email,password}=req.body

    // Check if user with same email or username already exists
    const isUserExist=await UserModel.findOne({
        $or:[
            {username},
            {email},
        ]
    })

    // If user exists
    if(isUserExist){
        // If email is already verified, user cannot register again
        if(isUserExist.verified){
            return res.status(409).json({
                message: "User already exist",
                success:false,
                err:"user already exist"
            })
        }
        
        // If email is NOT verified, resend verification email
        if(!isUserExist.verified){
            // Generate new verification token
            const verifyEmailToken = jwt.sign(
                { userId: isUserExist._id, email: isUserExist.email },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            )

            // Update token in database
            isUserExist.verifyEmailToken = verifyEmailToken
            await isUserExist.save()

            // Send verification email
            const htmlContent = welcomeEmailTemplate(isUserExist.username, verifyEmailToken)

            await sendEmail({
                to: email,
                subject: "Verify Your Email - Perplexity",
                html: htmlContent,
                text: `Please verify your email at: ${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/verify-email?verifytoken=${verifyEmailToken}`
            })

            return res.status(200).json({
                message:"Account found but not verified. Verification email sent again. Please check your inbox.",
                success:true,
                user: {
                    username: isUserExist.username,
                    email: isUserExist.email,
                    verified: isUserExist.verified
                }
            })
        }
    }

    // Create new user if doesn't exist
    const user=await UserModel.create({
        username,
        email,
        password
    })

    // Generate email verification token
    const verifyEmailToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    )

    // Save token to database
    user.verifyEmailToken = verifyEmailToken
    await user.save()

    // Create beautiful welcome email
    const htmlContent = welcomeEmailTemplate(username, verifyEmailToken)

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity - Verify Your Email",
        html: htmlContent,
        text: `Welcome ${username}! Please verify your email at: ${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/verify-email?verifytoken=${verifyEmailToken}`
    })

    res.status(201).json({
        message:"User Registered Successfully! Please check your email to verify your account.",
        success:true,
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    })
}

export const verifyEmailController = async (req, res) => {
    try {
        const { verifytoken } = req.query

        if (!verifytoken) {
            return res.status(400).json({
                message: "Verification token is missing",
                success: false
            })
        }

        // Verify the JWT token
        const decoded = jwt.verify(verifytoken, process.env.JWT_SECRET || "your_secret_key")

        // Find user by token
        const user = await UserModel.findById(decoded.userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

     

        // Mark email as verified
        user.verified = true
        await user.save()

        // AFTER user.verified = true
user.verified = true
await user.save()

// 🔥 ADD THIS
const token = jwt.sign({
    id: user._id,
    username: user.username
}, process.env.JWT_SECRET, { expiresIn: "7d" })

res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
})

 return res.redirect("http://localhost:5173/login")


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                message: "Verification token has expired. Please register again.",
                success: false
            })
        }
        
        return res.status(400).json({
            message: "Invalid or expired verification token",
            success: false,
            error: error.message
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(404).json({
                message: "Invalid Credentials",
                success: false
            })
        }

        // Check if email is verified
        if(!user.verified){
            return res.status(403).json({
                message: "Please verify your email first. Check your inbox for the verification link.",
                success: false,
                verified: false
            })
        }

        // Compare password
        const isPasswordCorrect = await user.comparePassword(password)

        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Invalid Credentials",
                success: false
            })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET || "your_secret_key", {expiresIn: '7d'})

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(200).json({
            message: "Login Successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            success: false,
            error: error.message
        })
    }
}

export const getMeController=async(req,res)=>{
    try {
        const userId=req.user.id

        const user=await UserModel.findById(userId).select("-password")

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "User details fetched successfully",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                verified: user.verified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user details",
            success: false,
            error: error.message
        })
    }
}

export const resendVerifyEmailController = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            })
        }

        // Find user by email
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // Check if already verified
        if (user.verified) {
            return res.status(400).json({
                message: "Email is already verified",
                success: false
            })
        }

        // Generate new verification token
        const verifyEmailToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        // Update token in database
        user.verifyEmailToken = verifyEmailToken
        await user.save()

        // Send verification email
        const htmlContent = welcomeEmailTemplate(user.username, verifyEmailToken)

        await sendEmail({
            to: email,
            subject: "Verify Your Email - Perplexity",
            html: htmlContent,
            text: `Please verify your email at: ${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/verify-email?verifytoken=${verifyEmailToken}`
        })

        res.status(200).json({
            message: "Verification email sent successfully. Please check your inbox.",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to resend verification email",
            success: false,
            error: error.message
        })
    }
}