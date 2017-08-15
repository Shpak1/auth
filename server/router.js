const authentication = require('./contollers/authentication');

module.exports = function (app) {
    app.post('/signup', authentication.signup)
};
