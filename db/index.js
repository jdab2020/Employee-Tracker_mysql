// not using util | promisify

const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "BootCAMP2020!",
    database: "employees"
})

connection.connect() 

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // display all employees and used for selecting id for modifying database
    findAllEmployees() {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee " +
            "LEFT JOIN role on employee.role_id = role.id " +
            "LEFT JOIN department on role.department_id = department.id", function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // selects departments table to be used to select department.id
    findAllDepartments() {
        return new Promise ((resolve,reject) => {
            this.connection.query("SELECT * FROM department", function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // display employees of a selected department
    findAllEmployeesByDepartment(departmentId) {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee " +
            "LEFT JOIN role ON employee.role_id = role.id " +
            "LEFT JOIN department ON role.department_id = department.id " +
            "WHERE department.id = ?", departmentId, function(err,result){
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // display employees under a selected manager
    findAllEmployeesByManager(managerId) {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee " +
            "LEFT JOIN role ON employee.role_id = role.id " +
            "LEFT JOIN department ON role.department_id = department.id " +
            "WHERE manager_id = ?", managerId, function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // removes a selected employee
    removeEmployee(employeeId) {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "DELETE FROM employee " +
            "WHERE employee.id = ?", employeeId, function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // selects role table to be used to select role.id
    findAllRoles() {
        return new Promise ((resolve,reject) => {
            this.connection.query("SELECT * FROM role", function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // updates the role of selected employee by id with selected role by role.id
    updateEmployeeRole(employeeId, roleId) {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "UPDATE employee " +
            "SET role_id = ? " +
            "WHERE employee.id = ?", [roleId, employeeId], function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // selects all but the chosen employee that is being updated
    findAllPossibleManagers(employeeId) {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "SELECT * FROM employee " +
            "WHERE id != ?", employeeId, function (err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // updates selected employee's manager
    updateEmployeeManager(employeeId, managerId) {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "UPDATE employee " +
            "SET manager_id = ? " +
            "WHERE employee.id = ?", [managerId, employeeId], function (err,result){
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // create a new role under a department
    createRole(role) {
        return new Promise ((resolve,reject) => {
            this.connection.query("INSERT INTO role SET ?", role, function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // remove a role
    removeRole(roleId) {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "DELETE FROM role " +
            "WHERE role_id = ?", roleId, function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // create a department
    createDepartment(department) {
        return new Promise ((resolve,reject) => {
            this.connection.query("INSERT INTO department SET ?", department, function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // remove a department
    removeDepartment(departmentId) {
        return new Promise ((resolve,reject) => {
            this.connection.query(
            "DELETE FROM department " +
            "WHERE id = ?", departmentId, function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
    // create an employee
    createEmployee(employee) {
        return new Promise ((resolve,reject) => {
            this.connection.query("INSERT INTO employee SET ?", employee, function(err,result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
};

module.exports = new DB(connection);