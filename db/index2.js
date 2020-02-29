// not using util | promisify

const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "BootCAMP2020!",
    database: "employees"
})

connection.connect()

const db = {}
// display all employees and used for selecting id for modifying database
db.findAllEmployees = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee " +
            "LEFT JOIN role on employee.role_id = role.id " +
            "LEFT JOIN department on role.department_id = department.id", function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// selects departments table to be used to select department.id
db.findAllDepartments = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM department", function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}
// display employees of a selected department
db.findAllEmployeesByDepartment = (departmentId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee " +
            "LEFT JOIN role ON employee.role_id = role.id " +
            "LEFT JOIN department ON role.department_id = department.id " +
            "WHERE department.id = ?", departmentId, function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// display employees under a selected manager
db.findAllEmployeesByManager = (managerId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee " +
            "LEFT JOIN role ON employee.role_id = role.id " +
            "LEFT JOIN department ON role.department_id = department.id " +
            "WHERE manager_id = ?", managerId, function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// removes a selected employee
db.removeEmployee = (employeeId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM employee " +
            "WHERE employee.id = ?", employeeId, function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// selects role table to be used to select role.id
db.findAllRoles = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM role", function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}
// updates the role of selected employee by id with selected role by role.id
db.updateEmployeeRole = (employeeId, roleId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE employee " +
            "SET role_id = ? " +
            "WHERE employee.id = ?", [roleId, employeeId], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// selects all but the chosen employee that is being updated
db.findAllPossibleManagers = (employeeId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM employee " +
            "WHERE id != ?", employeeId, function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// updates selected employee's manager
db.updateEmployeeManager = (employeeId, managerId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE employee " +
            "SET manager_id = ? " +
            "WHERE employee.id = ?", [managerId, employeeId], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// create a new role under a department
db.createRole = (role) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO role SET ?", role, function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}
// remove a role
db.removeRole = (roleId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM role " +
            "WHERE role_id = ?", roleId, function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// create a department
db.createDepartment = (department) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO department SET ?", department, function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}
// remove a department
db.removeDepartment = (departmentId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM department " +
            "WHERE id = ?", departmentId, function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}
// create an employee
db.createEmployee = (employee) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO employee SET ?", employee, function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}


module.exports = db;