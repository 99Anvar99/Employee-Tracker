const figlet = require('figlet');
const enquirer = require('enquirer');
const connection = require('./config/connection');

// Define the choices using a more concise syntax
const choices = [
  { title: 'View all departments', value: viewDepartments },
  { title: 'View all roles', value: viewRoles },
  { title: 'View all employees', value: viewEmployees },
  { title: 'Add a department', value: addDepartment },
  { title: 'Add a role', value: addRole },
  { title: 'Add an employee', value: addEmployee },
  { title: 'Update an employee role', value: updateEmployeeRole },
  { title: 'Update a role title', value: updateRoleTitle },
  { title: 'Delete a role', value: deleteRole },
  { title: 'Delete an employee', value: deleteEmployee },
  { title: 'Delete a department', value: deleteDepartment },
  { title: 'Update an employee manager', value: updateEmployeeManager },
  { title: 'View employees by manager', value: viewEmployeesByManagerPrompt },
  { title: 'View employees by department', value: viewEmployeesByDepartmentPrompt },
  { title: 'View the total utilized budget of a department', value: viewTotalUtilizedBudgetPrompt },
  { title: 'Exit', value: exit },
];

// Prompts the user to select an option
async function promptUser() {
  const response = await enquirer.prompt({
    type: 'select',
    name: 'option',
    message: 'Please select an option:',
    choices: choices.map(choice => choice.title),
  });

  const selectedOption = choices.find(choice => choice.title === response.option);
  if (selectedOption) {
    selectedOption.value(); // Call the corresponding function
  } else {
    console.log('Invalid option');
    promptUser();
  }
}

// Reusable function for executing queries and displaying results
function executeQuery(query, params, successMessage) {
  connection.query(query, params, function (err, res) {
    if (err) throw err;
    if (successMessage) {
      console.log(successMessage);
    }
    if (res) {
      console.table(res);
    }
    promptUser();
  });
}

// View all departments
function viewDepartments() {
  executeQuery('SELECT * FROM departments', null);
}

// View all roles
function viewRoles() {
  executeQuery('SELECT * FROM roles', null);
}

// View all employees
function viewEmployees() {
  executeQuery('SELECT * FROM employee', null);
}

// Add a department
function addDepartment() {
  enquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:'
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the ID of the department:'
    }
  ]).then(function (response) {
    executeQuery('INSERT INTO departments SET ?', {
      name: response.departmentName,
      id: response.departmentId
    }, `Department [ ${response.departmentName} ] added successfully with ID: ${response.departmentId}`);
  });
}

// Add a role
function addRole() {
  enquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the role:'
    },
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
    executeQuery('INSERT INTO roles (id, title, salary, department_id) VALUES (?, ?, ?, ?)',
      [response.id, response.title, response.salary, response.departmentId],
      `Role [ ${response.title} ] added successfully in department [ ${response.departmentId} ]`);
  });
}

// Add an employee
function addEmployee() {
  enquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the employee first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee last name:'
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
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the employee:'
    }
  ]).then(function (response) {
    executeQuery('INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)',
      [response.id, response.firstName, response.lastName, response.roleId, response.managerId],
      `Employee [ ${response.firstName} ${response.lastName} ] added successfully with role [ ${response.roleId} ] and manager [ ${response.managerId} ]`);
  });
}

// Update an employee's role
function updateEmployeeRole() {
  enquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to update:'
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'Enter the new role ID for the employee:'
    }
  ]).then(function (response) {
    executeQuery('UPDATE employee SET role_id = ? WHERE id = ?', [response.newRoleId, response.employeeId],
      `Employee [ ID: ${response.employeeId} ] role updated successfully!`);
  });
}

// Update a role title
function updateRoleTitle() {
  enquirer.prompt([
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the ID of the role you want to update:'
    },
    {
      type: 'input',
      name: 'newTitle',
      message: 'Enter the new title for the role:'
    }
  ]).then(function (response) {
    executeQuery('UPDATE roles SET title = ? WHERE id = ?', [response.newTitle, response.roleId],
      `Role [ ID: ${response.roleId} ] title updated successfully!`);
  });
}

// Delete a role
function deleteRole() {
  enquirer.prompt({
    type: 'input',
    name: 'roleId',
    message: 'Enter the ID of the role you want to delete:',
  }).then(function (response) {
    executeQuery('DELETE FROM roles WHERE id = ?', [response.roleId],
      `Role [ ID: ${response.roleId} ] deleted successfully!`);
  });
}

// Delete an employee
function deleteEmployee() {
  enquirer.prompt({
    type: 'input',
    name: 'employeeId',
    message: 'Enter the ID of the employee you want to delete:',
  }).then(function (response) {
    executeQuery('DELETE FROM employee WHERE id = ?', [response.employeeId],
      `Employee [ ID: ${response.employeeId} ] deleted successfully!`);
  });
}

// Delete a department
function deleteDepartment() {
  enquirer.prompt({
    type: 'input',
    name: 'departmentId',
    message: 'Enter the ID of the department you want to delete:',
  }).then(function (response) {
    executeQuery('DELETE FROM departments WHERE id = ?', [response.departmentId],
      `Department [ ID: ${response.departmentId} ] deleted successfully!`);
  });
}

// Update an employee's manager
function updateEmployeeManager() {
  enquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to update:'
    },
    {
      type: 'input',
      name: 'newManagerId',
      message: 'Enter the new manager ID for the employee:'
    }
  ]).then(function (response) {
    executeQuery('UPDATE employee SET manager_id = ? WHERE id = ?', [response.newManagerId, response.employeeId],
      `Employee [ ID: ${response.employeeId} ] manager updated successfully!`);
  });
}

// View employees by manager
function viewEmployeesByManagerPrompt() {
  enquirer.prompt({
    type: 'input',
    name: 'managerId',
    message: 'Enter the manager ID to view employees:',
  }).then(function (response) {
    viewEmployeesByManager(response.managerId);
  });
}

// View employees by department
function viewEmployeesByDepartmentPrompt() {
  enquirer.prompt({
    type: 'input',
    name: 'departmentId',
    message: 'Enter the department ID to view employees:',
  }).then(function (response) {
    viewEmployeesByDepartment(response.departmentId);
  });
}

// View the total utilized budget of a department
function viewTotalUtilizedBudgetPrompt() {
  enquirer.prompt({
    type: 'input',
    name: 'departmentId',
    message: 'Enter the department ID to view budget:',
  }).then(function (response) {
    viewTotalUtilizedBudget(response.departmentId);
  });
}

// View employees by manager
function viewEmployeesByManager(managerId) {
  executeQuery('SELECT * FROM employee WHERE manager_id = ?', [managerId]);
}

// View employees by department
function viewEmployeesByDepartment(departmentId) {
  executeQuery('SELECT * FROM employee e INNER JOIN roles r ON e.role_id = r.id WHERE r.department_id = ?', [departmentId]);
}

// View the total utilized budget of a department
function viewTotalUtilizedBudget(departmentId) {
  executeQuery('SELECT SUM(salary) AS total_utilized_budget FROM employee e INNER JOIN roles r ON e.role_id = r.id WHERE r.department_id = ?', [departmentId],
    `Total Utilized Budget for Department ID ${departmentId}: $`);
}

// Exit the application
function exit() {
  figlet.text('Goodbye!', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
    connection.end();
  });
}

// Start the application
connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected as id ' + connection.threadId);
  promptUser();
});
