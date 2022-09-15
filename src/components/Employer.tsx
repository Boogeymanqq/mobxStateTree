import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { Root } from "../mst";
import { EmployeeComponent } from "./Employee";

interface EmployerComponentsProps {
  rootTree?: Root;
}

// @inject("rootTree");

export const Employer = inject("rootTree")(
  observer(({ rootTree }: EmployerComponentsProps) => {
    const [name, setName] = useState<string>("");
    const [hoursWorked, setHoursWorked] = useState<string>("");
    const [searchString, setSearchString] = useState<string>("");
    if (!rootTree) return null;
    // console.log(rootTree.employer);

    const changeEmployeeName = (e: any) => {
      setName(e.target.value);
    };

    const changeHoursWork = (e: any) => {
      setHoursWorked(e.target.value);
    };

    const searchStringChange = (e: any) => {
      setSearchString(e.target.value);
    };

    const onSubmit = (e: any) => {
      e.preventDefault();
      if (!rootTree) return null;
      rootTree.employer.newEmployee(name, parseInt(hoursWorked));
      setName("");
      setHoursWorked("");
    };

    const num_employees = rootTree.employer.num_employees;
    const filtered_emplyees =
      rootTree.employer.filtered_employees(searchString);

    return (
      <div>
        <h1>{rootTree.employer.name}</h1>
        <h3>{rootTree.employer.location}</h3>
        <p>{`Total Number of employees: ${num_employees}`}</p>
        <hr />
        <p>New Employee</p>
        <form onSubmit={onSubmit}>
          <label>
            Name :
            <input type="text" value={name} onChange={changeEmployeeName} />
          </label>
          <br />
          <label>
            Hourse worked :
            <input type="text" value={hoursWorked} onChange={changeHoursWork} />
            <br />
            <button>Submit</button>
          </label>
        </form>
        <hr />
        <input
          placeholder="Search Employee Name"
          value={searchString}
          onChange={searchStringChange}
        />
        {filtered_emplyees.map((employee) => (
          <EmployeeComponent key={employee.id} employee={employee} />
        ))}
        {/* {rootTree.employer.employees.map((employee) => (
          <EmployeeComponent key={employee.id} employee={employee} />
        ))} */}
      </div>
    );
  })
);
