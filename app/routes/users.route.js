const userController = require("../controllers/users.controller");

module.exports = function(app, router) {

    app.route('/user')
        // .post(userController.registerUser)
        .get(userController.getUsers);

    app.route('/mail').post(userController.sendMail);
}