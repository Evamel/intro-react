import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import uuidv4 from '../node_modules/uuid/dist/v4'




const LOCAL_STORAGE_KEY = 'todo.App.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()



//Loads the saved todos
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodos) setTodos(storedTodos)
}, [])


//"Save" the todos
useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])


function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}


//Handle the todos
function handleAddTodo(e) {
  const name = todoNameRef.current.value
  if(name === '') return
  setTodos(prevTodos => {
    return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
  })
  todoNameRef.current.value = null //Erase the input after clicking on "add todo"
}

//Erase the done todos
function handleClearTodos(){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}

  return (
    <>
    <div className="title">To do list</div>
    <div className="left">{todos.filter( todo => !todo.complete).length} left to do</div>
    <input className="text" ref={todoNameRef} type="text" />
      <div className="form">
      <button className="addBtn" onClick= {handleAddTodo}>Add todo</button>
      <button className="deleteBtn" onClick= {handleClearTodos}>Clear done</button>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;
