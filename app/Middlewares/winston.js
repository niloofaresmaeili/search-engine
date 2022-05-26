'use strict';
const appRoot = require('app-root-path');
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const logDir = 'log';


if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: 'YYYY-MM-DD'
});



var logger = createLogger({
    level:'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.json(),
      format.colorize(),
    ),
    handleExceptions : true,
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.colorize(),
        )
      }),
      dailyRotateFileTransport,

    ]
});

logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };


module.exports = logger;