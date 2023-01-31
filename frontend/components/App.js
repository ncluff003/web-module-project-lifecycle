import React from "react";
import axios from "axios";
import Form from "./Form";
import TodoList from "./TodoList";

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

  completeTask = (e, id) => {
    e.preventDefault();

    try {
      const updateTask = async () => {
        const response = await axios({
          method: "PATCH",
          url: `${URL}/${id}`,
          data: {
            id: id,
          },
        });
        console.log(response);

        this.setState({ ...this.state, ["todos"]: [...this.state.todos.map((todo) => (todo.id === id ? (todo = response.data.data) : todo))] });
      };
      updateTask();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <>
        <h2 className="todos-header">ToDos:</h2>
        <section className="todos">
          <TodoList todos={this.state.todos} completeTask={this.completeTask} />
          <Form todo={this.state.todo} changeToDo={this.changeToDo} addTask={this.addTask} />
        </section>
      </>
    );
  }
}
