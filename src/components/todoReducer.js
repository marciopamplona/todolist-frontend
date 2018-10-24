import { Map, List } from "immutable";

const INITIAL_STATE = Map({
  createDescription: "",
  completedFilter: "ALL",
  sortOrder: "date",
  sortOrderIdx: 0,
  errorMessage: "",
  list: List([]),
  editWindow: Map({
    open: false,
    textValue: "",
    todo: {
      id: "",
      state: "INCOMPLETE",
      description: "",
      dateAdded: 0
    }
  })
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "API_ERROR":
      return state.merge({ errorMessage: "API CONNECTION ERROR" });
    case "CHANGED_DESCRIPTION":
      return state.merge({ createDescription: action.payload });
    case "CLEAR":
      return state.merge({ createDescription: "" });
    case "GET_ALL":
      return state.merge({ list: action.payload, errorMessage: "" });
    case "CLOSE_EDIT_WINDOW":
      return state.mergeDeep(
        Map({
          editWindow: Map({ open: false })
        })
      );
    case "OPEN_EDIT_WINDOW":
      return state.mergeDeep(
        Map({
          editWindow: Map({
            open: true,
            textValue: action.payload.textValue,
            todo: action.payload
          })
        })
      );
    case "SUBMIT_EDIT_WINDOW":
      return state.mergeDeep(
        Map({
          editWindow: Map({
            open: true,
            textValue: action.payload
          }),
          errorMessage: ""
        })
      );
    case "TOGGLE_COMPLETED_FILTER":
      return state.merge({
        completedFilter: `${
          state.get("completedFilter") === "INCOMPLETE" ? "ALL" : "INCOMPLETE"
        }`
      });
    case "TOGGLE_SORT_FILTER": {
      const sortOrder = ["date", "az", "za"];
      let nextIdx = sortOrder.indexOf(state.get("sortOrder")) + 1;
      if (nextIdx > 2) nextIdx = 0;

      return state.merge({
        sortOrder: sortOrder[nextIdx],
        sortOrderIdx: nextIdx
      });
    }
    default:
      return state;
  }
};
