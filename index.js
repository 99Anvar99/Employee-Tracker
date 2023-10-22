const prompts = require('prompts');
const cTable = require('console.table');
const figlet = require('figlet');
// importing the connection from the config folder
const connection = require('./config/connection');
// Connecting to database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // Create a figlet text to print on terminal screen "Employee Tracker"
    figlet('Employee Tracker', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    })
    // Wait until employee tracker figlet is printed
    setTimeout(() => {
        promptUser();
    });
});

async function promptUser() {
	(async () => {
	  const choices = [ // Choices for user to select from
		{ title: 'View all departments', value: 'viewDepartments' },
		{ title: 'View all roles', value: 'viewRoles' },
		{ title: 'View all employees', value: 'viewEmployees' },
		{ title: 'Add a department', value: 'addDepartment' },
		{ title: 'Add a role', value: 'addRole' },
		{ title: 'Add an employee', value: 'addEmployee' },
		{ title: 'Update an employee role', value: 'updateEmployeeRole' },
		{ title: 'Exit', value: 'exit' },
	  ];
  
    // Prompt user to select from choices
	  const response = await prompts({
		  type: 'select',
		  name: 'action',
		  message: 'What would you like to do?',
		  choices: choices.map((choice, index) => ({
		    title: `${index + 1}. ${choice.title}`,
		    value: choice.value,
		  })),
	  });

	  console.log('response:', response);
	  // Perform action based on user's choice
    switch (response.action) {
    case 'viewDepartments':
      viewDepartments();
      break;
    case 'viewRoles':
      viewRoles();
      break;
    case 'viewEmployees':
      viewEmployees();
      break;
    case 'addDepartment':
      addDepartment();
      break;
    case 'addRole':
      addRole();
      break;
    case 'addEmployee':
      addEmployee();
      break;
    case 'updateEmployeeRole':
      updateEmployeeRole();
      break;
    case 'exit':
      figlet('Good bye!', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
      })
      // Close the connection
      connection.end();
      break;
	  }
	})();
}