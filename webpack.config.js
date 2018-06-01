module.exports = env => {
    return env === 'dev'
        ? require('./config/webpack.config.dev')
        : require('./config/webpack.config.prod');
};