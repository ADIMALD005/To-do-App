import React from 'react'
import tick_tag from '../assets/tick_icon.jpeg'
import not_tick_tag from '../assets/not_tick_icon.png'
import delete_tag from '../assets/delete_icon.png'
import edit_tag from '../assets/edit.png'

const TodoListItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div onClick= {() => {toggle(id)}} className={`flex items-center cursor-pointer ${isComplete ? "line-through" : ""}`}>

       <div  className='flex flex-1 gap-2 my-3'>
          <img className='w-7 rounded-full' src={isComplete ? tick_tag : not_tick_tag} />
          <h1>{text}</h1>
       </div>

         <div>
              {/* <img onClick={() => {deleteTodo()}} className='w-3.5 cursor-pointer' src={edit_tag}/> */}
              <img onClick={() => {deleteTodo(id)}} className='w-3.5 cursor-pointer' src={delete_tag}/>
         </div>
    </div>
  )
}

export default TodoListItems
