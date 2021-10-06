import React from 'react';




const todoList = (props) => {
    return (
        <div className="todo-container">
        <ul className="todo-list">
           {props.tableGoal.map((goal,index)=> {
             return  <div className="todo-list-line" key={index}>
                  <li>{goal}</li>
                  <button className="btn" onClick={()=>props.removeItemHandler(index)}><i className="fas fa-trash-alt"></i></button>
                  </div>
           })}
        </ul>
      </div>

    );
  
}

export default todoList;