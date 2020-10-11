// https://github.com/visionmedia/debug

function createLogger(namespace) {
  const logger = {};

  if (typeof process !== 'undefined' && process.env.DEBUG) {
    logger.log = data => {
      console.log(
        JSON.stringify({
          namespace,
          ...data,
        })
      );
    };

    logger.bytes = data => {
      data.bytes = Array.from(data.bytes);

      logger.log(data);
    };
  } else {
    logger.bytes = logger.log = () => {};
  }

  return logger;
}

module.exports = { createLogger };
