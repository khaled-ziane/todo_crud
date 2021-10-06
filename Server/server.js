const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('./dbconnect')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get("/todos", (req, res) => {
    sql = "SELECT * from tbl_todo"
    con.query(sql, (err, select) => {
        if (err) throw err
        console.log(select)
        res.json(select)
    })
})


app.post("/insertTodo", (req, res) => {
    console.log(req.body)
    const goal = req.body.goal
    console.log(goal)
    sql = `INSERT into tbl_todo (todo_name) VALUES ('${goal}')`
    con.query(sql, (err, insert) => {
        if (err) throw err
        console.log("Todo added !")
        res.json({ payload: goal })
    })
})

app.put("/updateTodo", (req, res) => {
    console.log(req.body)
    const index = req.body.index
    const updategoal = req.body.updategoal
    console.log(index, updategoal)
    sql = `UPDATE  tbl_todo set todo_name='${updategoal}' where todo_id='${index}'`
    con.query(sql, (err, update) => {
        if (err) throw err
        console.log("Todo updated !")
    })

})

app.get('/update', (req, res) => {
    console.log(req.query)
    const id = req.query.id
    sql = `SELECT * from tbl_todo where todo_id='${id}'`
    con.query(sql, (err, sel) => {
        if (err) throw err
        console.log(sel)
        res.json(sel)
    })
})

app.delete("/deleteTodo", (req, res) => {
    console.log(req.query)
    const index = req.query.id
    console.log(index)
    sql = `DELETE from tbl_todo where todo_id='${index}'`
    con.query(sql, (err, del) => {
        if (err) throw err
        console.log("Todo deleted !")
    })
})





app.listen(3001, () =>
    console.log(`Server running on http://localhost:${3001}`)
)