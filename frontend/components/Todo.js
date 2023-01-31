import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p onClick={(e) => this.props.completeTask(e, this.props.todo.id)}>{`${this.props.todo && this.props.todo.name} ${this.props.todo && this.props.todo.completed === true ? "✔" : ""}`}</p>;
  }
}
