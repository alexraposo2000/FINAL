export class Student {
  name: string = "";
  id: string = "";
  email: string = "";
  //TODO: use a Map<string, string>
  goal_requirements: string = "";
  goal_conf_management: string = "";

  constructor() {
    this.clean();
  }

  clean(): void {
    this.name = "";
    this.id = "";
    this.email = "";
    this.goal_requirements = "";
    this.goal_conf_management = "";
  }

  clone(): Student {
     var student: Student = new Student();
     student.copyFrom(this);
     return student;
  }

  copyFrom(from: Student): void {
     this.name = from.name;
     this.id = from.id;
     this.email = from.email;
     //TODO: refactor! easy to forget one case; this should be a loop.
     this.goal_requirements = from.goal_requirements;
     this.goal_conf_management = from.goal_conf_management;
  }

}