
const inquirer = require("inquirer");
const connection = require("./db/connection");

require ("console.table");

const db = require("./db");




//function init() {
 // promptQuestions();
//}


  //con.connect(function(err) {
  //  if (err) throw err;
  //  console.log("Not connected");
 // });


  function promptQuestions() {
    inquirer.prompt([
      {
        type: "list",
        message: "Please select function",
        name: "choice",
        choices: [
          "Employee directory",
          "Manager directory",
          "Create employee",
          "Remove employee",
          "Update employee role",
          "Add new role",
          "Exit"
        ]
      }
    ]).then(function(val) {
      switch(val.choice) {
        case "Employee directory":
          findAllEmployees();
          break;

        case "Manager directory":
          findAllManagers();
          break;

        case "Create employee":
          createEmployee();
          break;

        case "Remove employee":
          removeEmployee();
          break;

        case "Update employee role":
          updateEmployeeRole();
          break;

        case "add new role":
          newRole();
          break;

        case "exit":
          exit = [];
          break;
          
      }
    });
  }

function findAllEmployees() {
  return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id, LEFT JOIN employee manager on manager.id = employee.manager_id;",
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);

          promptQuestions();
        })
        
  )
};
function findAllManagers() {
    return this.connection.query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?", 
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);

          promptQuestions();
        })
    )
};
/*function createEmployee() {
    const roleArray = [];
    const managerArray = [];
  
  return this.connection.query(
        "INSERT INTO employee SET ?", 
        connection.query(query, function(err, res) {
          if (err) throw err;
          
          console.table(res);

          promptQuestions();
        })
    )
};*/
function removeEmployee() {
    return this.connection.query(
        "DELETE FROM employee WHERE id = ?",
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);

          promptQuestions();
        })
    )
      }
function updateEmployeeRole() {
     return this.connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);

          promptQuestions();
        })
    
     ) 

    }


  function createEmployee() {

    const roleArray = [];
    const managerArray = [];
    inquirer.prompt([
      {
        name: "firstname",
        type: "input",
        message: "Please enter new employees first name"
      },

      {
        name: "lastname",
        type: "input",
        message: "Please enter new employees last name"
      },

      {
        name: "position",
        type: "input",
        message: "Please enter new employees position",
        choices: newRole()
      },

      {
        name: "choice",
        type: "list",
        message: "Please enter manasger's name"

      },

    ]).then(function (val) {
      const idRole = roleInput().indexOf(val.role) + 1
      const idManager = managerSelection().indexOf(val.choice) + 1
      connection.query(createEmployee())

    })
  };
/*
function newRole() {
 const 

};*/