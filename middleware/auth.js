import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;
        
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;                                 //unique googleId = sub
        }
        
        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;


//import { OAuth2Client } from "google-auth-library"
//const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client('526830108116-0ui1untnimav9r6q1i2c24m4on5vjs8t.apps.googleusercontent.com', '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');

// const googleAuth = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         if(!token){
//             console.log("Unauthorized");
//         }
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: "526830108116-0ui1untnimav9r6q1i2c24m4on5vjs8t.apps.googleusercontent.com",
//         });
//         const payload = ticket.getPayload();
//         if(payload){
//             req.userId = payload['sub'];
//             next()
//             return
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
