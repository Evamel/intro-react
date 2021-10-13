import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import Input from './Input';
import Btn from './Btn';

export default function App() {
  const [todos, setTodos] = useState(['Todo 1', 'Todo 2']) 
  return (
    <>
    <TodoList todos={todos}/>
    <Input/>
    <Btn/>
    <div>0 left to do</div>
    </>
  )
}

