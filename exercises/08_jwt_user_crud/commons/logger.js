const logger = (message) => {
    console.info(`INFO: ${new Date()}: \t ${message}`);
}

module.exports = logger;