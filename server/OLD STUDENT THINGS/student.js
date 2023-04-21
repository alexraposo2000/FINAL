"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor() {
        this.name = "";
        this.id = "";
        this.email = "";
        //TODO: use a Map<string, string>
        this.goal_requirements = "";
        this.goal_conf_management = "";
        this.clean();
    }
    clean() {
        this.name = "";
        this.id = "";
        this.email = "";
        this.goal_requirements = "";
        this.goal_conf_management = "";
    }
    clone() {
        var student = new Student();
        student.copyFrom(this);
        return student;
    }
    copyFrom(from) {
        this.name = from.name;
        this.id = from.id;
        this.email = from.email;
        //TODO: refactor! easy to forget one case; this should be a loop.
        this.goal_requirements = from.goal_requirements;
        this.goal_conf_management = from.goal_conf_management;
    }
}
exports.Student = Student;
//# sourceMappingURL=student.js.map