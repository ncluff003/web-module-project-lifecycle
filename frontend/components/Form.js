import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form onSubmit={(e) => this.props.addTask(e)}>
        <input type={"text"} placeholder="To-Do Name" name="name" value={this.props.todo.name || ""} onChange={(e) => this.props.changeToDo(e)} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
