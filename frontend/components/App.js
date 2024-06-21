import React from 'react';
import { Component } from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    console.log("constructor invoked")
    super()
    this.state = {
      todos: [],
      displayCompleted: true,
      newTodo: ""
    }
  }

  componentDidMount() {
    console.log("CDM")
    axios
      .get("http://localhost:9000/api/todos")
      .then(res => {
        this.setState({todos: res.data.data})
      })
      .catch(err => console.log(err.message))
  }

  handleInputChange = event => {
    this.setState({newTodo: event.target.value})
    console.log(this.state.newTodo)
  }

  handleNewTodoSubmit() {
    console.log(this.state.newTodo)
    const newTodoObj = {
      id: Date.now(),
      name: this.state.newTodo,
      completed: false
    }
    this.setState(prevState => ({
      todos: prevState.todos.concat(newTodoObj),
      newTodo: ""
    }))
  }

  render() {
    console.log("render invoked")
    console.log(this.state)
    return (
    <div>
      <ul>
        {this.state.displayCompleted ? 
          this.state.todos.map(td => {
            return <li key={td.id}>{td.name} {td.completed ? "✔️ " : ""}</li>
          }) :
          this.state.todos.map(td => {
            return !td.completed ? <li key={td.id}>{td.name}</li> : null
          })
        
        }
      </ul>
      <form onSubmit={this.handleNewTodoSubmit}>
        <input placeholder="type new todo here" onChange={this.handleInputChange}></input>
        <button>submit</button>
      </form>
        

    </div>
    )
  }
}
