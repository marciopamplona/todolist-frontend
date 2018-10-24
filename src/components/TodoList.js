import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { edit, del, openEditWindow, getAll } from "./todoActions";
import { getCompletedSortedTodos } from "../selectors/combinedFilter";

class TodoList extends Component {
  componentWillMount() {
    this.props.getAll();
  }
  render() {
    const { del, list, edit, openEditWindow } = this.props;
    const check = list.get(0);
    if (check !== undefined && !check.hasOwnProperty("id")) {
      return <div />;
    }
    return (
      <div className="todo-list">
        {list.map((todo, index) => (
          <div key={todo.id} className="todo">
            <button
              className="todo__button"
              onClick={() => {
                if (todo.state === "INCOMPLETE") {
                  edit(todo, todo.description, "COMPLETE");
                }
              }}
            >
              <i className="material-icons">
                {todo.state === "COMPLETE"
                  ? "check_box_outline"
                  : "check_box_outline_blank"}
              </i>
            </button>

            <span className="todo__text">{`${todo.description}`}</span>

            <button
              className="todo__button"
              onClick={() => {
                openEditWindow(todo);
              }}
              style={{
                visibility: `${
                  todo.state === "COMPLETE" ? "hidden" : "visible"
                }`
              }}
            >
              <i className="material-icons">edit</i>
            </button>

            <button
              className="todo__button"
              onClick={() => {
                del(todo);
              }}
            >
              <i className="material-icons">delete</i>
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: getCompletedSortedTodos(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ edit, del, openEditWindow, getAll }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
