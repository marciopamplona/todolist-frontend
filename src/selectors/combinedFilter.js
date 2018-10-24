import { createSelector } from "reselect";

function descriptionAZ(a, b) {
  return ("" + a.description).toUpperCase() < ("" + b.description).toUpperCase()
    ? -1
    : 1;
}
function descriptionZA(a, b) {
  return ("" + a.description).toUpperCase() < ("" + b.description).toUpperCase()
    ? 1
    : -1;
}
function dateAdded(a, b) {
  return ("" + a.dateAdded).toUpperCase() < ("" + b.dateAdded).toUpperCase()
    ? -1
    : 1;
}

export const getCompletedSortedTodos = createSelector(
  state => state.get("completedFilter"),
  state => state.get("sortOrder"),
  state => state.get("list"),
  (completedFilter, sortOrder, todos) => {
    let filteredData;

    if (completedFilter === "INCOMPLETE") {
      filteredData = todos.filter(v => v.state === "INCOMPLETE");
    } else {
      filteredData = todos;
    }

    switch (sortOrder) {
      case "az":
        return filteredData.sort(descriptionAZ);
      case "za":
        return filteredData.sort(descriptionZA);
      case "date":
        return filteredData.sort(dateAdded);
      default:
        return filteredData;
    }
  }
);
