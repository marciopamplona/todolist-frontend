import axios from "axios";
import { List } from "immutable";

let API = "";
if (process.env.NODE_ENV === "production") {
  API = process.env.REACT_APP_API_URL_PROD;
} else {
  API = process.env.REACT_APP_API_URL;
}

console.log(process.env);

const onError = (dispatch, error) => {
  dispatch({ type: "API_ERROR", payload: error });
  return error;
};

export const changeDescription = e => ({
  type: "CHANGED_DESCRIPTION",
  payload: e.target.value
});

export const closeEditWindow = () => ({ type: "CLOSE_EDIT_WINDOW" });

export const openEditWindow = todo => ({
  type: "OPEN_EDIT_WINDOW",
  payload: todo
});

export const submitEditWindow = e => ({
  type: "SUBMIT_EDIT_WINDOW",
  payload: e.target.value
});

export const getAll = () => {
  return async (dispatch, getState) => {
    const onAction = resp => {
      dispatch({ type: "GET_ALL", payload: List(resp.data) });
      return resp;
    };

    try {
      const resp = await axios.get(`${API}/todos`);
      return onAction(resp);
    } catch (error) {
      return onError(dispatch, error);
    }
  };
};

export const createTodo = description => {
  return async dispatch => {
    try {
      const resp = await axios.put(`${API}/todos`, { description });
      dispatch(clear());
      dispatch(getAll());
      return resp;
    } catch (error) {
      return onError(dispatch, error);
    }
  };
};

export const del = todo => {
  return async dispatch => {
    try {
      const resp = await axios.delete(`${API}/todo/${todo.id}`);
      dispatch(getAll());
      return resp;
    } catch (error) {
      return onError(dispatch, error);
    }
  };
};

export const edit = (todo, description, state) => {
  return async dispatch => {
    try {
      const resp = await axios.patch(`${API}/todo/${todo.id}`, {
        description: description,
        state: state
      });
      dispatch(getAll());
      return resp;
    } catch (error) {
      return onError(dispatch, error);
    }
  };
};

export const clear = () => ({ type: "CLEAR" });

export const toggleCompletedFilter = () => ({
  type: "TOGGLE_COMPLETED_FILTER"
});

export const toggleSortFilter = () => ({
  type: "TOGGLE_SORT_FILTER"
});
