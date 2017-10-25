const config = require('./config');

Promise.resolve()
    .then(() => require('./database')(config.DB_CONNECTION_STRING))
    .then((database) => require('./data')(database))
    .then((data) => require('./app')(data))
    .then((app) => {
        // eslint-disable-next-line
         
        const port = process.env.SERVER_PORT || '3000';
        app.listen(port, () => console.log(`Server running.`))
    });

