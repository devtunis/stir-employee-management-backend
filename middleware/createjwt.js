

import jwt from "jsonwebtoken"
export const   generateJWT = (payload) =>{


  const secrettoken = "123" ;

    return jwt.sign(payload, secrettoken, {
        expiresIn: "10d", 
  });
}




 