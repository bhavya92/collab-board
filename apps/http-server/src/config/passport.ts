import passport from "passport"
import { redisClient } from "@repo/be-common/redis"
import {Strategy} from "passport-google-oauth20"
import { prismaClient } from "@repo/db/dbclient"

passport.use( new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID || "",
    clientSecret:process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL:process.env.GOOGLE_CALLBACK_URL
}, async function(acesstoken, refreshToken, profile, cb) {
    console.log(acesstoken);
    console.log(refreshToken);
    console.log(profile);
    const userId = `google:${profile.id}`;

    let email : string = "random"
       
    if(profile ===  undefined || profile === null)
        return;
    
    if(!(profile.emails === undefined))
            email = profile.emails[0]!.value;
 
    
    const userData = {
        id: profile.id,
        name: profile.displayName,
        email
    };
    //add user to postgres
    await prismaClient.user.create({
        data:{
            name: profile.displayName,
            email: email,
            image: profile._json.picture
        }
    })
    return cb(null,userData);
} )


)

passport.serializeUser( (user,cb) => {
    cb(null, user)
});

passport.deserializeUser( async(id,cb) => {
    //TODO : Reterive user from redis based on id 
    // if exists then cb(null,user)
    //else cb(null, false)
    cb(null,false);
});

export default passport;