import React, { useState, useRef, useEffect } from 'react';
import uuidv4 from 'uuid/dist/v4'
import TodoList from './TodoList';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);  // Use state creates variable and function to change that exact variable (?)

  const todoNameRef = useRef();

  useEffect(() => {
    // Load stored todos
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, [])

  useEffect(() => {
    // Store todos for later reload
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    // Function called whenever a value in the following array changes. Here: is todos changes. 
  }, [todos]);

  function toggleTodo(id) {
    // In react, don't directly change state variable, but modify copy instead (first)
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }
  
  function handleAddTodo(eventProp) {
    const name = todoNameRef.current.value;
    if (name === "") return
    
    setTodos(prevTodos => {
      console.log(prevTodos);
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}];
    });

    todoNameRef.current.value = null;
  }
  
  function handleClearTodos(e) {
    const filteredTodos = todos.filter(todo => !todo.complete);
    setTodos(filteredTodos);
  }

  return (
    <>  
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type='text' />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{ todos.filter(todo => !todo.complete).length } left to do.</div>
    </>
  );
}

export default App;
