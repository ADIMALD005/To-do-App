import { useState , useRef, useEffect } from 'react'
import todo_tag from '../assets/todo_icon.png'
import TodoListItems from './TodoListItems'
import './TodoList.css'

const TodoList = () => {
         const [todoList , setTodoList] = useState(
            localStorage.getItem("todos") ? 
            JSON.parse(localStorage.getItem("todos")) 
          : []);
         const inputRef = useRef();
         const scrollRef = useRef();

   const add = () => {
      const inputText = inputRef.current.value.trim();
      
      const newTodo = {
         id: crypto.randomUUID(),
         text: inputText,
         isComplete: false
      }

    setTodoList((prev) => [...prev, newTodo])
    inputRef.current.value = "";
   }

   const deleteTodo = (id) => {
      setTodoList((prevTodo) => {
         return prevTodo.filter((todo) => todo.id !== id)
      })
   }

   const toggle = (id) => {
      setTodoList((prvTodo) => {
         return prvTodo.map((todo) => {
            if(todo.id === id){
               return {...todo, isComplete: !todo.isComplete}
            }
            return todo;
         })
      })
   }

   useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todoList));

      const containerElem = scrollRef.current
      if(containerElem) {
         containerElem.scrollTop = containerElem.scrollHeight;
      }
   },[todoList]);
  return (
    <>
        <section className='flex justify-center items-center min-h-160'>
           <div className='bg-white w-3/10 h-120 rounded-lg p-7'>

             {/* ------title----- */}
             <div className='flex items-center  gap-2 mt-7'>
                <img className='w-7' src={todo_tag}/>
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
             </div>
           
           {/* ------input box----- */}
            <div className='flex items-center my-7 rounded-full  bg-gray-200 '>
                  <input ref={inputRef} className='h-14 flex-1 bg-transparent 
                  outline-none border-0 pl-6 pr-2 cursor-pointer' type='text'  placeholder='Add your task' />

                  <button 
                  onClick={add} 
                  className='h-14 bg-orange-400 w-32 font-mediun cursor-pointer
                  border-none text-white text-long rounded-full'>ADD +</button>
            </div>

            {/* ------input text----- */}
            <div className='TodoList' ref={scrollRef}>
                {todoList.map((item , index) => { 
                   return <TodoListItems key={index} text={item.text}
                    id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
                })}
            </div> 
           </div>
        </section>
    </>
  )
}

export default TodoList
