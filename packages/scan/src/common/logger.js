const log4js = require("log4js");

const logLevel = process.env.LOG_LEVEL || "debug";
const isProduction = process.env.NODE_ENV === "production";

const scanFileCategory = "block-scan";
const blockFileCategory = "block";
const busFileCategory = "bus";
const remarkCategory = "remark";

log4js.configure({
  appenders: {
    [scanFileCategory]: { type: "file", filename: `log/scan.log` },
    [blockFileCategory]: { type: "file", filename: `log/block.log` },
    [busFileCategory]: { type: "file", filename: `log/bus.log` },
    [remarkCategory]: { type: "file", filename: `log/remark.log` },
    errorFile: {
      type: "file",
      filename: `log/errors.log`,
    },
    errors: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorFile",
    },
    out: { type: "stdout" },
  },
  categories: {
    default: {
      appenders: [isProduction ? scanFileCategory : "out", "errors"],
      level: logLevel,
    },
    [blockFileCategory]: {
      appenders: [
        isProduction ? blockFileCategory : "out",
        isProduction ? blockFileCategory : "errors",
      ],
      level: logLevel,
    },
    [busFileCategory]: {
      appenders: [
        isProduction ? busFileCategory : "out",
        isProduction ? busFileCategory : "errors",
      ],
      level: logLevel,
    },
    [remarkCategory]: {
      appenders: [
        isProduction ? remarkCategory : "out",
        isProduction ? remarkCategory : "errors",
      ],
      level: logLevel,
    },
  },
});

const logger = log4js.getLogger(scanFileCategory);
const blockLogger = log4js.getLogger(blockFileCategory);
const busLogger = log4js.getLogger(busFileCategory);
const remarkLogger = log4js.getLogger(remarkCategory);

module.exports = {
  logger,
  blockLogger,
  busLogger,
  remarkLogger,
};
