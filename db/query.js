const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "BootCAMP2020!",
    database: "employees"
})

connection.connect() 

connection.query = util.promisify(connection.query);

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee " +
            "LEFT JOIN role on employee.role_id = role.id " +
            "LEFT JOIN department on role.department_id = department.id"
        )

    }

    findAllDepartments() {
        return this.connection.query(
            "SELECT * FROM department"
        )
    }

    findAllEmployeesByDepartment(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee " +
            "LEFT JOIN role ON employee.role_id = role.id " +
            "LEFT JOIN department ON role.department_id = department.id " +
            "WHERE department.id = ?", departmentId
        );
    }

    // findAllEmployeesByManager(managerId) {
        
    // }



}

module.exports = new DB(connection);