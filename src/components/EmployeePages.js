import React from "react";
import Pager from "./Pager";
// import Pager from '[your-package-name-here]';

export default function EmployeePages({ employees }) {
  return (
    <div>
      <h1>Employees</h1>
      <Pager
        pages={employees.map(employee => (
          <ul key={employee.id}>
            <li>
              Name: {employee.last_name}, {employee.first_name}
            </li>
            <li>Department: {employee.department}</li>
            <li>Salary: ${employee.salary}</li>
          </ul>
        ))}
        getLabel={i => `${employees[i].last_name}, ${employees[i].first_name}`}
        pageInfoUrl={label =>
          `https://www.example.com/employees/info?label=${label}`
        }
        supportRequestUrl="https://www.example.com/support"
      >
        {({ page, goPrevious, goNext }) => (
          <>
            <div />
          </>
        )}
      </Pager>
    </div>
  );
}
