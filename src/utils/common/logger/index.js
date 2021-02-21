function createLogger(namespace) {
  const logger = {};

  logger.bytes = logger.log = () => {};

  return logger;
}

module.exports = { createLogger };
