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
    // display all employees and used for selecting id for modifying database
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee " +
            "LEFT JOIN role on employee.role_id = role.id " +
            "LEFT JOIN department on role.department_id = department.id"
        )

    }
    // selects departments table to be used to select department.id
    findAllDepartments() {
        return this.connection.query(
            "SELECT * FROM department"
        )
    }
    // display employees of a selected department
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee " +
            "LEFT JOIN role ON employee.role_id = role.id " +
            "LEFT JOIN department ON role.department_id = department.id " +
            "WHERE department.id = ?", departmentId
        );
    }
    // display employees under a selected manager
    findAllEmployeesByManager(managerId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee " +
            "LEFT JOIN role ON employee.role_id = role.id " +
            "LEFT JOIN department ON role.department_id = department.id " +
            "WHERE manager_id = ?", managerId
        )
    }
    // removes a selected employee
    removeEmployee(employeeId) {
        return this.connection.query(
            "DELETE FROM employee " +
            "WHERE employee.id = ?", employeeId
        )
    }
    // selects role table to be used to select role.id
    findAllRoles() {
        return this.connection.query(
            "SELECT * FROM role"
        )
    }
    // updates the role of selected employee by id with selected role by role.id
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee " +
            "SET role_id = ? " +
            "WHERE employee.id = ?", [roleId, employeeId]
        )
    }
    // selects all but the chosen employee that is being updated
    findAllPossibleManagers(employeeId) {
        return this.connection.query(
            "SELECT * FROM employee " +
            "WHERE id != ?", employeeId
        )
    }
    // updates selected employee's manager
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.query(
            "UPDATE employee " +
            "SET manager_id = ? " +
            "WHERE employee.id = ?", [managerId, employeeId]
        )
    }




}

module.exports = new DB(connection);