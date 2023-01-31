import React from "react";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="todos">
        {this.props.todos &&
          this.props.todos.map((todo, index) => {
            return <Todo todo={todo} key={index} completeTask={this.props.completeTask} />;
          })}
      </section>
    );
  }
}
