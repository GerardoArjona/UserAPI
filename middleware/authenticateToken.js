const jwt  =  require('jsonwebtoken');

const authenticationMiddleware = (req,res,next) => {
    console.log(req.get("Authorization"))
    try{
        const token = req.get("Authorization");
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxzYWxnYWRvZjEyMzJAZ21haWwuY29tIiwibmFtZSI6IkxpZ29yaW8gRWR3aW4gU2FsZ2FkbyBGbG9yZXMiLCJleHAiOjE1MjQxMDI4ODIsImlhdCI6MTUyNDAxNjQ4Mn0.IzYiTA78Qr-c6USFF7YOa_A4MHe68wKuwprW9yLcQm4
        let p_token=token.split(" ")[1];

        jwt.verify(p_token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                //res.status(401).json(err);
                req.isAdmin = false;
                req.err = err
                next();
            }else{
                req.user=decoded;
                req.isAdmin = true;
                next();
            }

        });
    }catch(error){
        console.log(error)
        res.json({message:"No token"}).status(400);
    }
}

module.exports ={
    authenticationMiddleware,
}