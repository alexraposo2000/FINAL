"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
var base_url = "http://localhost:4200/";
describe("O server", () => {
    var server;
    beforeAll(() => { server = require('../server'); });
    afterAll(() => { server.closeServer(); });
    it("initially returns a list of empty students", () => {
        return request.get(base_url + "students")
            .then(body => expect(body).toBe("[]"))
            .catch(e => expect(e).toEqual(null));
    });
    it("only add students", () => {
        var options = { method: 'POST', uri: (base_url + "student"), body: { name: "Mari", id: "962" }, json: true };
        return request(options)
            .then(body => expect(body).toEqual({ success: "Student successfully registered." })).catch(e => expect(e).toEqual(null));
    });
    it("do not add students with duplicate id", () => {
        var student1 = { "json": { "name": "Mari", "id": "965", "email": "" } };
        var student2 = { "json": { "name": "Pedro", "id": "965", "email": "" } };
        var response1 = '{"name":"Mari","id":"965","email":""}';
        var response2 = '{"name":"Pedro","id":"965","email":""}';
        return request.post(base_url + "student", student1)
            .then(body => {
            expect(body).toEqual({ success: "Student successfully registered." });
            return request.post(base_url + "student", student2)
                .then(body => {
                expect(body).toEqual({ failure: "Student could not be registered." });
                return request.get(base_url + "students")
                    .then(body => {
                    expect(body).toContain(response1);
                    expect(body).not.toContain(response2);
                });
            });
        })
            .catch(err => {
            expect(err).toEqual(null);
        });
    });
});
//# sourceMappingURL=server.spec.js.map