const log4js = require("log4js");

const logLevel = process.env.LOG_LEVEL || "debug";
const isProduction = process.env.NODE_ENV === "production";

const busFileCategory = "bus";
const remarkCategory = "remark";

log4js.configure({
  appenders: {
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
      appenders: ["out", "errors"],
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

const busLogger = log4js.getLogger(busFileCategory);
const remarkLogger = log4js.getLogger(remarkCategory);

module.exports = {
  busLogger,
  remarkLogger,
};
