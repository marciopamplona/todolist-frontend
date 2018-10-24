import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createTodo, changeDescription, getAll } from "./todoActions";

class NewTodo extends Component {
  render() {
    const { createTodo, changeDescription, description } = this.props;

    return (
      <div className="new-todo">
        <input
          type="text"
          className="new-todo__input"
          placeholder="Type the TODO description"
          value={description}
          onChange={changeDescription}
          onKeyPress={e => {
            if (e.key === "Enter") {
              createTodo(description);
            }
          }}
        />
        <button
          className="new-todo__button"
          onClick={() => {
            createTodo(description);
          }}
        >
          Create
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  description: state.get("createDescription")
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ createTodo, changeDescription, getAll }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTodo);
