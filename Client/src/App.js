import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import "./App.css";
import Navbar from './components/Navbar'
// import Form from './components/form';
// import TodoList from './components/todoList';
import Update from './components/Update';

function App() {
  const [tableGoal, settableGoal] = useState([])
  const [change, setchange] = useState('')
  const [check, setcheck] = useState(false)
  const [test, settest] = useState('')
  useEffect(() => {
    axios.get("http://localhost:3001/todos").then((response) => {
      console.log(response.data)
      settableGoal(response.data)
    }, error => {
      // setError(error)
    }).finally(() => {
      // setLoading(false)
    })
  }, [check])

  const addItemHandler = (e) => {
    const goal = e.target.txtgoal.value
    const data = {
      goal: goal
    }
    axios.post(`http://localhost:3001/insertTodo`, data).then((response) => {
      settableGoal([...tableGoal, { todo_name: response.data.payload }])
    })
    setcheck(!check)
    setchange('')
    // settableGoal([...tableGoal,{todo_name:goal}])
    e.preventDefault()
  }
  let history = useHistory()
  const updateItemHandler = (e) => {
    const index = e.target.id.value
    const updategoal = e.target.updategoal.value
    console.log(index, updategoal)

    const data = {
      index: index,
      updategoal: updategoal
    }
    console.log(data.index, data.updategoal)
    axios.put(`${process.env.REACT_APP_API_URL}updateTodo`, data).then((response) => {
      history.push("/")
      setcheck(!check)
    })

    e.preventDefault()
  }
  const removeItemHandler = (index) => {
    axios.delete(`${process.env.REACT_APP_API_URL}deleteTodo?id=${index}`)
    const newTablefilter = tableGoal.filter(goal => goal.todo_id != index)
    settableGoal(newTablefilter)
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact >
            <Navbar />
            <form onSubmit={addItemHandler} >
              <input type="text" className="todo-input" name="txtgoal" onChange={(e) => setchange(e.target.value)} value={change} />
              <button className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
              </button>
            </form>
            <div className="todo-container">
              <ul className="todo-list">
                {tableGoal.map((goal, index) => {
                  return <div className="todo-list-line" key={index}>
                    <li>{goal.todo_name}</li>
                    <div>
                      <Link to={`/update/${goal.todo_id}`}> <button className="btn update-btn"><i className="far fa-edit"></i></button></Link>
                      <button className="btn" onClick={() => removeItemHandler(goal.todo_id)}><i className="fas fa-trash-alt"></i></button>
                    </div>
                  </div>
                })}
              </ul>
            </div>
          </Route>
          <Route path="/update/:id" exact >
            <Update
              updateItemHandler={updateItemHandler}
              tableGoal={tableGoal}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );

}

export default App;
