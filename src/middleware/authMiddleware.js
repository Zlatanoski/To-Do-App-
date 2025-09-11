import jwt from 'jsonwebtoken'

//we need this auth middleware function in order to intercept the
//  network req and verify that the token is correct for that user

function authMiddleware (req,res,next){

    const token = req.headers['authorization']

    if(!token) {return res.status(401).json({message:"No token provided!"})}

    //past the guard clause then means we need to verify token

    jwt.verify(token, process.env.JWT_SECRET, (error,decoded )=>{
        
        if(error){return res.status(401).json({message:"Invalid token!"})}
        //Error meaning either token expired or its not the correct user 
        
        //decoded argument gives us access to core params of verified user
        //we can modify the req before hitting the endpoint since we are intercepting using this middleware

        req.userId = decoded.id // id that we found from that user
        next() // go to the endpoint 

    })

}

export default authMiddleware