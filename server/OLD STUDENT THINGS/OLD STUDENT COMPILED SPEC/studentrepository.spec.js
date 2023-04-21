"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studentrepository_1 = require("../studentrepository");
const student_1 = require("../../common/student");
describe("O students in the repository", () => {
    var repository;
    function addStudent(name, id) {
        var student = new student_1.Student();
        student.name = name;
        student.id = id;
        repository.add(student);
    }
    beforeEach(() => repository = new studentrepository_1.StudentRepository());
    it("is initially empty", () => {
        expect(repository.getStudents().length).toBe(0);
    });
    it("student was registered correctly", () => {
        addStudent("Mari", "683");
        expect(repository.getStudents().length).toBe(1);
        var student = repository.getStudents()[0];
        expect(student.name).toBe("Mari");
        expect(student.id).toBe("683");
        expect(student.email).toBe("");
        expect(student.goal_requirements).toBe("");
        expect(student.goal_conf_management).toBe("");
    });
    it("does not accept students with duplicate id", () => {
        addStudent("Mari", "683");
        addStudent("Pedro", "683");
        expect(repository.getStudents().length).toBe(1);
    });
});
//# sourceMappingURL=studentrepository.spec.js.map