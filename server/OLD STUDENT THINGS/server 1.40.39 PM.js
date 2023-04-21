"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.server = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const studentrepository_1 = require("./studentrepository");
var taserver = express();
var studentrepo = new studentrepository_1.StudentRepository();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
taserver.use(allowCrossDomain);
taserver.use(bodyParser.json());
taserver.get('/students', function (req, res) {
    res.send(JSON.stringify(studentrepo.getStudents()));
});
taserver.post('/student', function (req, res) {
    var student = req.body;
    student = studentrepo.add(student);
    if (student) {
        res.send({ "success": "Student successfully registered." });
    }
    else {
        res.send({ "failure": "Student could not be registered." });
    }
});
taserver.put('/student', function (req, res) {
    var student = req.body;
    student = studentrepo.update(student);
    if (student) {
        res.send({ "success": "Student data successfully updated." });
    }
    else {
        res.send({ "failure": "Student data could not be updated." });
    }
});
var server = taserver.listen(3000, function () {
    console.log('Server listening on port 3000!');
});
exports.server = server;
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
//# sourceMappingURL=server.js.map