const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

class Logging {
    Logger = winston.createLogger({
        level: 'silly',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json()
        ),
        transports: [
            new DailyRotateFile({
                level: 'silly',
                filename: 'app-%DATE%.log',
                zippedArchive: true,
                maxSize: '2mb',
                maxFiles: '30d',
                dirname: 'log'
            })
        ]
    });

    info = (data) => {
        this.Logger.info(data);
    }

    error = (data) => {
        this.Logger.error(data);
    }
}

module.exports = new Logging();