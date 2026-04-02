import jwt from "jsonwebtoken"

export const authUser=async(req,res,next)=>{


    const token=req.cookies.token
   
    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access. Token not found"
        })
    }


    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({
            message:"unauthorized",
            success:false,
            err:"Invalid Token"
        })
    }
}