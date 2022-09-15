import { applySnapshot, getSnapshot, onSnapshot } from "mobx-state-tree";
import { RootModel } from ".";

export const SetupRootStore = () => {
  const rootTree = RootModel.create({
    employer: {
      id: "1",
      name: "Bob Burger",
      location: "New York",
      employees: [],
    },
  });
  onSnapshot(rootTree, (snapshot) => console.log(snapshot));
  //   const currentRootTree = getSnapshot(rootTree);
  //   applySnapshot(rootTree, {
  //     ...currentRootTree,
  //     employer: { ...currentRootTree.employer, location: "Manhattan" },
  //   });
  return { rootTree };
};
