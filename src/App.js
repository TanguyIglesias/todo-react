import React, { useState, useRef, useEffect } from "react";
import './App.css'
import TodoList from "./TodoList";
import { v4 as uuid } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleAddTodo = () => {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  const handleClearTodo = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <div className="App">
      <h1>Todo List</h1>
      <input ref={todoNameRef} type="text" id="AddTodoBar" placeholder="Add a Todo" />
      <div className="Button">
      <button id="ButtonAdd" onClick={handleAddTodo}>Add Todo</button>
      <button id="ButtonClear" onClick={handleClearTodo}>Clear Completed Todo</button>
      </div>
      <div id="TodoList">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
      <div>{todos.filter(todo => !todo.complete).length} Left to do</div>
      </div>
    </>
  )
}

export default App;
