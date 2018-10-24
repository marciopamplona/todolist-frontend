import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleCompletedFilter } from "./todoActions";

class TodoListFooter extends Component {
  render() {
    const { filter, toggleCompletedFilter } = this.props;

    return (
      <div className="card-body align-items-center d-flex">
        <button
          className="todo-list-footer__button"
          onClick={toggleCompletedFilter}
        >
          <i className="material-icons">
            {filter === "INCOMPLETE"
              ? "check_box_outline"
              : "check_box_outline_blank"}
          </i>
        </button>
        <span className="card-title todo-list-footer">Hide completed</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({ filter: state.get("completedFilter") });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleCompletedFilter }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListFooter);
