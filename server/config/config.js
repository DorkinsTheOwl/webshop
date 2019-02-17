const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    // in real world the json is added to .gitignore
    const config = require('./config.json');
    const envConfig = config[env];

    Object.keys(envConfig).forEach(key => {
        process.env[key] = envConfig[key];
    });
}
