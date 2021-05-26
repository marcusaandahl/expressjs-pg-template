var indexRouter = require('./index');
var usersRouter = require('./users');

function loadRouters(app) {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
};

module.exports = {loadRouters};