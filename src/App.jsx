import { useEffect, useRef, useState } from 'react'
import ToDoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid'
import styles from "./App.module.css"
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const toDoNameRef = useRef(null)

  // Load from localStorage ONCE
  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    )
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Save whenever todos changes
useEffect(() => {
  console.log('Saving todos:', todos)
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

  function toggleToDo(id){
    const newTodos=[...todos]
    const todo=newTodos.find(toDo=> toDo.id===id)
    todo.complete=!todo.complete
    setTodos(newTodos)
  }
  function handleClearToDo(){
    const newTodos=todos.filter(todo=> !todo.complete)
    setTodos(newTodos)
  }
  function handleAddToDo() {
    const name = toDoNameRef.current.value
    if (name === '') return

    setTodos(prevTodos => [
      ...prevTodos,
      { id: uuidv4(), name, complete: false }
    ])

    toDoNameRef.current.value = ''
  }

  return (
    <>
      <ToDoList todos={todos} toggleToDo={toggleToDo}/>
      <input ref={toDoNameRef} type="text" />
      <button className={styles.btn}onClick={handleAddToDo}>Add ToDo</button>
      <button onClick={handleClearToDo}> Clear Complete</button>
      <div> {todos.filter(todo=> !todo.complete).length} left to do </div>
    </>
  )
}

export default App
