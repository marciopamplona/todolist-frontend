import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleSortFilter } from "./todoActions";

class TodoListHeader extends Component {
  state = {
    orderText: ["creation date", "description (a-z)", "description (z-a)"]
  };

  render() {
    const { orderText } = this.state;
    const { sortOrderIdx, toggleSortFilter } = this.props;

    return (
      <div className="card-body">
        <span
          className="card-title todo-list-header"
          onClick={toggleSortFilter}
        >
          Tasks
        </span>
        <button className="todo-list-header__button" onClick={toggleSortFilter}>
          {`Order by ${orderText[sortOrderIdx]}`}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sortOrder: state.get("sortOrder"),
  sortOrderIdx: state.get("sortOrderIdx")
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleSortFilter }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListHeader);
