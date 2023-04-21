"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const student_1 = require("../common/student");
class StudentRepository {
    constructor() {
        this.students = [];
    }
    add(student) {
        var result = null;
        if (this.idAvailable(student.id)) {
            result = new student_1.Student();
            result.copyFrom(student);
            this.students.push(result);
        }
        return result;
    }
    idAvailable(id) {
        return !this.students.find(a => a.id == id);
    }
    update(student) {
        var result = this.students.find(a => a.id == student.id);
        if (result)
            result.copyFrom(student);
        return result;
    }
    getStudents() {
        return this.students;
    }
}
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=studentrepository.js.map