import { createClient, RedisClientType } from "redis";
import winston from "winston";

let appLogger : Console | winston.Logger = console;

export const redisClient : RedisClientType = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || "",
        port: parseInt(process.env.REDIS_PORT || "")
    },
});

redisClient.on("connect", () => {
    appLogger.info("Redis Connected");
});

redisClient.on("ready", () => {
    appLogger.info("Redis Cclient ready to use");
});

redisClient.on("error", (err) => {
    appLogger.error(`Redis connection error ${err}`);
});

redisClient.on("end", () => {
    appLogger.info("Redis Client disocnnected");
});

export function setRedisLogger(logger : winston.Logger) {
    appLogger = logger;
}

export async function connect_redis() {
    if(!redisClient.isOpen) {
        await redisClient.connect();
    }
}
