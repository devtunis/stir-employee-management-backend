

import jwt from "jsonwebtoken"
export const   generateJWT = (payload) =>{


  const secrettoken = process.env.secret_key ;

    return jwt.sign(payload, secrettoken, {
        expiresIn: "1d", 
  });
}




 