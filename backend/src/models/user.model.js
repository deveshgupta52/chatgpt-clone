import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username must be unique"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"Email must be unique"],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verified:{
        type:Boolean,
        default:false
    },
    verifyEmailToken:{
        type:String,
        default:null
    },

},{timestamps:true})


userSchema.pre('save',async function(){
    if(!this.isModified('password')) return;
    this.password=await bcrypt.hash(this.password,10)
    
})


userSchema.methods.comparePassword=function (candidatePassword){
    return bcrypt.compare(candidatePassword,this.password)
}


 const UserModel = mongoose.model("Users", userSchema)
 export default UserModel

