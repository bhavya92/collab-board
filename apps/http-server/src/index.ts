import { appLogger } from "./logger"
import express from "express"
import { connect_redis,setRedisLogger,redisClient } from "@repo/be-common/redis";
import passport from "./config/passport";
import session from 'express-session';

import cors from 'cors'
import { RedisStore } from "connect-redis";
import { isAuthenticated } from "./middleware/auth";

const app = express();
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
);
 
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  }));
    

const main = async() => {
    setRedisLogger(appLogger);
    try {
        await connect_redis();
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
    app.listen(3002, () => {
        appLogger.info(`Server running on port 3002`);
        console.log(`Server running on port 3002`);
    });
}

main()

app.get('/auth/google',passport.authenticate('google',{
    scope: ['profile','email']
}));

app.get('/oauth2/redirect/google', passport.authenticate("google",{
    failureRedirect : 'http://localhost:3000',
    successRedirect: "http://localhost:3000/profile"
}));

app.get("/", (req, res) => {
    res.send(200).json({
        "message":"Hi there"
    })
});

app.get("/profile",isAuthenticated, (req, res) => {
    res.send(200).json({
        "message":"profile"
    })
});
