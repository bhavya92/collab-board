import winston from "winston";

const logFormat = winston.format.printf( ({level,message,timestamp}) => {
    return `${timestamp} [${level.toUpperCase()}] ${message}`
});

export const getAppLogger = (pathToFile: string) => {
    return winston.createLogger({
            level:"debug",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                logFormat
            ),
            transports: [
                new winston.transports.File({
                    filename:pathToFile,
                    level:'info'
                }),
                new winston.transports.Console()
            ]
        })      
    
}


export const getHttpLogger = (pathToFile: string) => {
    return (
        winston.createLogger({
            level:'http',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                logFormat
            ),
            transports:[
                new winston.transports.File({
                    filename: pathToFile,
                    level:'http'
                }),
                new winston.transports.Console()
            ]
        })
    )
}
