import { flow, onSnapshot, types } from "mobx-state-tree";
import { applySnapshot, Instance } from "mobx-state-tree";
import { v4 as uuidv4 } from "uuid";
import api from "axios";

const EmployeeModel = types
  .model("Employee", {
    id: types.identifier,
    name: types.string,
    hours_worked: types.number,
  })
  .actions((self) => {
    function editEmployee(name: string, hours_worked: number) {
      applySnapshot(self, { ...self, name, hours_worked });
    }
    return { editEmployee };
  });

const EmployerModel = types
  .model("Empolyer", {
    id: types.identifier,
    name: types.string,
    location: types.string,
    employees: types.array(EmployeeModel),
  })
  .actions((self) => {
    function newEmployee(name: string, hours_worked: number) {
      const id = uuidv4();
      applySnapshot(self, {
        ...self,
        employees: [{ id, name, hours_worked }, ...self.employees],
      });
    }
    const save = flow(function* save(snapshot: any) {
      try {
        const response = yield api.post("/employers", { snapshot });
        console.log("response: ", response);
      } catch (error) {
        console.log("error :", error);
      }
    });
    function afterCreate() {
      onSnapshot(self, (snapshot) => save(snapshot));
    }
    return { newEmployee, save, afterCreate };
  })
  .views((self) => ({
    get num_employees() {
      return self.employees.length;
    },
    filtered_employees(searchString: string) {
      return self.employees.filter((employee) =>
        employee.name.includes(searchString)
      );
    },
  }));
// .volatile((_) => ({
//   employees: [],
// }));

const RootModel = types.model("Root", {
  employer: EmployerModel,
});

export { RootModel };

export type Root = Instance<typeof RootModel>;
export type Empolyer = Instance<typeof EmployerModel>;
export type Employee = Instance<typeof EmployeeModel>;
