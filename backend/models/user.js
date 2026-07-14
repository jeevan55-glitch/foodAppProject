//schema
const mongoose = require("mongoose")

const validator = require("validator")

const bcrypt = require("bcryptjs")

    const jwt = require("jsonwebtoken")

    const crypto = require("crypto")


    //step 2 create schema

    const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required:[true,"please enter your name"],
            maxlenth:[30,"Name cannot exceed 30 characters"]
        },
        email:{
            type: String,
            required:[true,"please enter your email"],
            unique:true,
            lowercase:true,
            validate:[validator.isEmail,"Enter a valid email"]
        },
        password:{
            type: String,
            required:[true,"please enter your password"],
            minlength:[6,"password should be greater than 6 characters"],
            select:false
        },
        passwordConfirm:{
            type: String,
            required:[true,"confirm password"],
            validate:{
                validator: function(e1){
                    return e1 === this.password
                },
                message: "passwords are not same"
            }
        },
        phoneNumber:{
            type: String,
            required:true,
            match: [/^[0-9]{10}$/, "Enter valid phone number"]
        },
        role:{
            type: String,
            enum:["user","admin"],
            default: "user"
        },
        avatar:{
            public_id:String,
            url: String,
        },
        passwordChangedAt: Date,
        passwordREsetToken: String,
        passwordResetExpires: Date
    },
    {timestamps:true}
);


//hashing password before saving user
//pre("save") => runs before data is saved
userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
})


//password compare
userSchema.methods.correctPassword = async function(
    candidatePassword, userPassword
){
    return await bcrypt.compare(candidatePassword, userPassword)

}

//checks whether the user's changed the password
//if yes, the old token is invalid and user must logib again
userSchema.methods.changedPasswordAfter= function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime()/1000, 10
        )
        return JWTTimestamp < changedTimestamp
    }
    return false;
};


//custom method to generate jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES}
    );
};
// PASSWORD RESET TOKEN
userSchema.methods.createPasswordResetToken = function () {

  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


module.exports = mongoose.model("User", userSchema)

    