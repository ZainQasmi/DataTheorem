// const employees = [
//   {
//     id: 1,
//     first_name: "Zain",
//     last_name: "Qasmi",
//     department: "Engineering",
//     salary: 50000
//   },
//   {
//     id: 2,
//     first_name: "Ali",
//     last_name: "Ahsan",
//     department: "Sales",
//     salary: 25000
//   },
//   {
//     id: 3,
//     first_name: "Muhammad",
//     last_name: "Anas",
//     department: "Human Resource",
//     salary: 10000
//   }
// ];

const employees = JSON.parse(
`{
  "employees":
    [
      {
        "id": 1,
        "first_name": "Iron",
        "last_name": "Man",
        "department": "Engineering",
        "salary": 50000
      },
      {
        "id": 2,
        "first_name": "Captain",
        "last_name": "America",
        "department": "Leadership",
        "salary": 25000
      },
      {
        "id": 3,
        "first_name": "Scarlet",
        "last_name": "Witch",
        "department": "Psionics",
        "salary": 10000
      },
      {
        "id": 4,
        "first_name": "Doctor",
        "last_name": "Strange",
        "department": "Medicine",
        "salary": 10000
      }
    ]
}`
);

// console.log(employees2.employees.map(emp => emp.id))
// console.log(typeof(employees2.employ[0]));
// console.log(employees2.employ.map(emp => emp.employee1));

export default employees.employees;
