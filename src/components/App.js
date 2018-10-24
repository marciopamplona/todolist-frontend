import React, { Component } from "react";
import { connect } from "react-redux";

import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import TodoListFooter from "./TodoListFooter";
import EditDialog from "./EditDialog";

import "../styles/App.scss";

class App extends Component {
  render() {
    return (
      <div className="mainDiv">
        <div className="container">
          <NewTodo />
        </div>
        <div className="card">
          <TodoListHeader />
          <TodoList />
          <TodoListFooter />
          <EditDialog />
        </div>
        <label className="debugLabel">
          {`Running in ${process.env.NODE_ENV} mode `}
        </label>
        <label className="debugError">{`${this.props.errorMessage}`}</label>
      </div>
    );
  }
}

const mapStateToProps = state => ({ errorMessage: state.get("errorMessage") });

export default connect(mapStateToProps)(App);
