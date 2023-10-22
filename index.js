const figlet = require('figlet');
// Prompt the user to select an option
const enquirer = require('enquirer');
const connection = require('./config/connection');

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  promptUser();
});

// List of choices for the user to select from
const choices = [
  { title: 'View all departments', value: 'viewDepartments' },
  { title: 'View all roles', value: 'viewRoles' },
  { title: 'View all employees', value: 'viewEmployees' },
  { title: 'Add a department', value: 'addDepartment' },
  { title: 'Add a role', value: 'addRole' },
  { title: 'Add an employee', value: 'addEmployee' },
  { title: 'Update an employee role', value: 'updateEmployeeRole' },
  { title: 'Update a role title', value: 'updateRoleTitle' },
  { title: 'Delete a role', value: 'deleteRole' },
  { title: 'Delete an employee', value: 'deleteEmployee' },
  { title: 'Delete a department', value: 'deleteDepartment' },
  { title: 'Update an employee manager', value: 'updateEmployeeManager' },
  { title: 'View employees by manager', value: 'viewEmployeesByManager' },
  { title: 'View employees by department', value: 'viewEmployeesByDepartment' },
  { title: 'View the total utilized budget of a department', value: 'viewTotalUtilizedBudget' },
  { title: 'Exit', value: 'exit' },
];

async function promptUser() {
  const response = await enquirer.prompt({
    type: 'select',
    name: 'option',
    message: 'Please select an option:',
    choices: choices.map(choice => choice.title),
  });

  // Handle the selected option
  const selectedOption = choices.find(choice => choice.title === response.option);
  if (selectedOption) {
    // Call the corresponding function or perform the desired action
    switch (selectedOption.value) {
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
      case 'updateRoleTitle':
        updateRoleTitle();
        break;
      case 'deleteRole':
        deleteRole();
        break;
      case 'deleteEmployee':
        deleteEmployee();
        break;
      case 'deleteDepartment':
        deleteDepartment();
        break;
      case 'updateEmployeeManager':
        updateEmployeeManager();
        break;
      case 'viewEmployeesByManager':
        viewEmployeesByManager();
        break;
      case 'viewEmployeesByDepartment':
        viewEmployeesByDepartment();
        break;
      case 'viewTotalUtilizedBudget':
        viewTotalUtilizedBudget();
        break;
      case 'exit':
        figlet.text('Goodbye!', function (err, data) {
          if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
          }
          console.log(data);
        })
        connection.end();
        break;
      default:
        console.log('Invalid option');
    }
  } else {
    console.log('Invalid option');
  }
};

// View all departments
function viewDepartments() {
  connection.query('SELECT * FROM departments', function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

// View all roles
function viewRoles() {
  connection.query('SELECT * FROM roles', function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

// View all employees
function viewEmployees() {
  connection.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

// Add a department
function addDepartment() {
  // Prompt the user for the department name
  enquirer.prompt({
    type: 'input',
    name: 'departmentName',
    message: 'Enter the name of the department:',
  }).then(function (response) {
    // Insert the new department into the database and prompt the user again
    connection.query('INSERT INTO departments SET ?', { name: response.departmentName }, function (err, res) {
      if (err) throw err;
      console.log('Department [ ' + response.departmentName + ' ] added successfully!');
      promptUser();
    });
  });
};

// Add a role
function addRole() {
  // Prompt the user for the role details
  enquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for the role:'
    }
  ]).then(function (response) {
    // Insert the new role into the database and prompt the user again 
    connection.query('INSERT INTO roles SET ?', {
      title: response.title,
      salary: response.salary,
      department_id: response.departmentId
    }, function (err, res) {
      if (err) throw err;
      console.log('Role [ ' + response.title + ' ] added successfully!');
      promptUser();
    });
  });
};

// Add an employee
function addEmployee() {
  // Prompt the user for the employee details
  enquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for the employee:'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the employee:'
    }
  ]).then(function (response) {
    // Insert the new employee into the database and prompt the user again 
    connection.query('INSERT INTO employee SET ?', {
      first_name: response.firstName,
      last_name: response.lastName,
      role_id: response.roleId,
      manager_id: response.managerId
    }, function (err, res) {
      if (err) throw err;
      console.log('Employee [ ' + response.firstName + ' ' + response.lastName + ' ] added successfully!');
      promptUser();
    });
  });
};