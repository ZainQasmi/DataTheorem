import React from 'react';
import Pager from './Pager'
// import Pager from '[your-package-name-here]';

export default function EmployeePages({ employees }) {
  return (
    <div>
      <h1>Employees</h1>
      <Pager
        pages={employees.map(employee => (
          <ul key={employee.id}>
            <li>Name: {employee.last_name}, {employee.first_name}</li>
            <li>Department: {employee.department}</li>
            <li>Salary: ${employee.salary}</li>
          </ul>
        ))}
        getLabel={
          i => `${employees[i].last_name}, ${employees[i].first_name}`
        }
        pageInfoUrl={(label) => `https://www.example.com/employees/info?label=${label}`}
        supportRequestUrl="https://www.example.com/support"
      >
        {({
          page,
          goPrevious,
          goNext,
          goToLabel,
          currentPageLabel,
          pageLabels,
          showHelpScreen,
          pageInfoIsLoading,
          pageInfoError,
          pageInfo,
        })=>(
          <>
            <div>
              <select onChange={e => goToLabel(e.target.value)}>
                {pageLabels.map(label => (
                  <option
                    key={label}
                    value={label}
                    selected={label === currentPageLabel}
                  >
                    {label}
                  </option>
                ))}
              </select>
              <button onClick={goPrevious}>Previous</button>
              <button onClick={goNext}>Next</button>
              <button onClick={showHelpScreen}>Help</button>
            </div>
            <div>
              {page}
            </div>
            {pageInfoIsLoading && (
              <div>Loading more info...</div>
            )}
            {pageInfoError && (
              <div>Error fetching info: {pageInfoError}</div>
            )}
            {pageInfo && (
              <div>
                # of Likes: {pageInfo.likes}
              </div>
            )}
          </>
        )}
      </Pager>
    </div>
  );
}