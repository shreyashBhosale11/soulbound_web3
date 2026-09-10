import { users } from "../db/user.schema.js";
import db from "../db/index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config';
import { randomBytes, createHash } from "node:crypto";


const registerUser = async(username ,email , password)=>{

    const hashedPassword = await bcrypt.hash(password, 10 );

    const [user]= await db.insert(users).values({
        username, 
        email, 
        password: hashedPassword,
    }).returning({
        id: users.id,
        username: users.username,
        email: users.email,
        role: users.role,
    });

    return user;

}

const isPasswordCorrect = async(password , hashedPassword)=>{
    return await bcrypt.compare(password , hashedPassword)
}


const generateAccessToken = (user)=>{
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user
    } , process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

const generateRefreshToken = (user)=>{
    return jwt.sign({
        id: user.id
    }, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

const generateTemporaryToken = ()=>{
    const unhashedToken = randomBytes(20).toString("hex");

    const hashedToken = createHash("sha256")
        .update(unhashedToken)
        .digest("hex")

    const tokenExpiry = new Date(
        Date.now() + 20* 60 * 1000

    )

    return {
        unhashedToken,
        hashedToken, 
        tokenExpiry
    }
    
}



export {registerUser , isPasswordCorrect , generateAccessToken , generateRefreshToken , generateTemporaryToken}