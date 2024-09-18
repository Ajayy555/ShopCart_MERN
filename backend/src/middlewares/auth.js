import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  const auth = req.headers?.authorization;
 
  if (!auth) {
    return res.status(401).json({
      status: 401,
      message: "UnAuthorized Access ..!",
    });
  }

  try {
    const decodedData = jwt.verify(auth, process.env.JWT_TOKEN_SECRET);
    if (decodedData) {
      req.user = decodedData;
      // res.json({success:true})
    }

    next();
  } catch (error) {
    res.status(501).json({
      status: 501,
      error,
    });
  }
};



export const isAdmin =async(req, res, next)=>{
  const auth = req.headers?.authorization;

  // console.log("isadmin:",auth);
  
  if (!auth) {
    
      return res.status(401).json({   
        status: 401,
        message: "You are not Authorized to modify user records ..!",
      });
    } 

      try {
          const decodedData = jwt.verify(auth, process.env.JWT_TOKEN_SECRET);
          if (decodedData.role==='admin') {
              next();
          }
          else{
            return er
          }
          
      } catch (error) { 
        res.status(501).json({
          status: 501,
          error,
          message:'Unatuthorized user'
      })
}
}