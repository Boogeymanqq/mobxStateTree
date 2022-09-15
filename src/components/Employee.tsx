import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { Employee } from "../mst";

interface EmployeeProps {
  employee: Employee;
}

export const EmployeeComponent = inject("rootTree")(
  observer(({ employee }: EmployeeProps) => {
    const [employeeName, setEmployeeName] = useState<string>(employee.name);
    const [hoursWorked, setHoursWorked] = useState<string>(
      `${employee.hours_worked}`
    );
    const [edit, setEdit] = useState<boolean>(false);

    const changeEmployeeName = (e: any) => {
      setEmployeeName(e.target.value);
    };

    const changeHoursWorked = (e: any) => {
      setHoursWorked(e.target.value);
    };

    const toggleEdit = () => {
      setEdit(!edit);
    };

    const onSubmit = (e: any) => {
      e.preventDefault();

      employee.editEmployee(employeeName, parseInt(hoursWorked));
      toggleEdit();
    };

    return (
      <div>
        {edit ? (
          <form onSubmit={onSubmit}>
            <input value={employeeName} onChange={changeEmployeeName} />
            <br />
            <input value={hoursWorked} onChange={changeHoursWorked} />
            <button type="submit">Submit</button>
            <button type="button" onClick={toggleEdit}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p>{`Name: ${employee.name}`}</p>
            <p>{`Hours worked: ${employee.hours_worked}`}</p>
            <button onClick={toggleEdit}>Edit</button>
          </>
        )}
      </div>
    );
  })
);
