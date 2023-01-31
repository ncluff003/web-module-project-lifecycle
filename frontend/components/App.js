import React from "react";
import axios from "axios";
import Form from "./Form";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todo: {
        name: "",
      },
    };
  }

  componentDidMount() {
    const getToDos = async () => {
      const response = await axios({
        method: "GET",
        url: URL,
      });
      console.log(response.data);
      this.setState({ ...this.state, ["todos"]: response.data.data });
    };
    getToDos();
    console.log(this.state);
  }

  changeToDo = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ ...this.state, ["todo"]: { ...this.state["todo"], [name]: value } });
  };

  addTask = (e) => {
    e.preventDefault();
    try {
      const submitTask = async () => {
        const response = await axios({
          method: "POST",
          url: URL,
          data: {
            name: this.state.todo.name,
          },
        });

        this.setState({ ...this.state, ["todos"]: [...this.state.todos, [response.data.data]] });
      };
      submitTask();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <>
        <h2 className="todos-header">ToDos:</h2>
        <section className="todos">
          {this.state.todos &&
            this.state.todos.map((todo, index) => {
              return <p key={index}>{`${todo && todo.name} ${todo && todo.completed === true ? "✔" : ""}`}</p>;
            })}
          <Form todo={this.state.todo} changeToDo={this.changeToDo} addTask={this.addTask} />
        </section>
      </>
    );
  }
}
