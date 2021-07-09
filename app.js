
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
require("dotenv").config({path: ".env"});
//const connection = require("./connection");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employees"
});

connection.connect(function(err) {
  if (err) throw err
  console.log("Connected")
  promptQuestions();
});


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
          updateEmployee();
          break;

        case "add new role":
          newRole();
          break;

        case "exit":
          connection.end();
          break;
          
      }
    });
  }
//db.findAllEmployees
function findAllEmployees() {
  connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;",
        function(err, res) {
          if (err) throw err;
          console.table(res);

          promptQuestions();
        })
        
      };

function findAllManagers() {
    connection.query(
        "SELECT id, first_name, last_name FROM employee WHERE id ! = ?", 
        function(err, res) {
          if (err) throw err;
          console.table(res);

          promptQuestions();
        })
        
      };

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
function updateEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter employee ID",
      name: "employeeUpdate"
    },
    {
      type: "input",
      message: "enter role Id associated for new role",
      name: "newRoleId"
    }
  ]).then(function(res) {
      const employeeUpdate = res.employeeUpdate;
      const newRoleId = res.newRoleId;
      connection.query(updateQuery, function(err,res){
        if (err) throw err;
      })
      console.table(res);
      promptQuestions();
  })
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
        //choices: newRole()
      },

      {
        name: "choice",
        type: "list",
        message: "Please enter manasger's name",
        //choices: managerSelection()

      },

    ]).then(function (val) {
      const idRole = roleInput().indexOf(val.role) + 1
      //const idManager = managerSelection().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?",
      {
        first_name: val.firstName,
        last_name: val.lastName,
        //manager_id: managerId,
        role_id: role_id
      }, function(err){
        if(err) throw err
        console.table(val)
        promptQuestions();
      }
      )

    })
  };

//function newRole() {
 //const 

//};
//const managerArray = [];
//const managerSelection