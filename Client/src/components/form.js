import React,{useState}  from 'react';


function Form(props) {


    return (
        <form onSubmit={props.addItemHandler}>
        <input type="text" className="todo-input" name="txtgoal" onChange={props.changeInputHandler}  value={props.change}/>
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
      </form>

    ); 
}
export default Form;

