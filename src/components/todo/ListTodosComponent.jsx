import { retreiveAllTodosForUser, deleteTodoForUser, updateTodoForUser } from "./api/TodoApiServiceCall";
import { useEffect, useState } from "react";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent(){

    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    const today = new Date();
    // const targetDate = new Date(today.getFullYear() + 12, today.getMonth, today.getDay())
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState("")

    function refreshTodos(){
        retreiveAllTodosForUser(username).then(response => {
            setTodos(response.data)
        })
        .catch(error => console.log(error))
    }

    // Runs on first call only once
    useEffect(() => refreshTodos(), [])

    function deleteTodo(username,id){
        deleteTodoForUser(username, id)
        .then(response => {
            setMessage(`Deleted todo with id: ${id}`)
            refreshTodos()
            setTimeout(()=> setMessage(""), 2000)
        })
        .catch(error => {
            console.log(error)
        })
    }

    function updateTodo(username,id){
        navigate(`/todo/${id}`)
    }

    function addNewTodo(username){
        navigate(`/todo/-1`)
    }
    
    return (
        <div className="container">
            <h1>Your todos</h1>
            {message && <div className="alert alert-danger">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        todos.map(todo =>  (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toDateString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                        <td> <button className="btn btn-success" onClick={() => updateTodo(username, todo.id)}>Update</button></td>
                                        <td> <button className="btn btn-danger" onClick={() => deleteTodo(username, todo.id)}>Delete</button></td>
                                    </tr>
                                    )
                                )
                        }
                    </tbody>
                </table>
            </div>
            <div><button className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</button></div>
        </div>
    )
}

export default ListTodosComponent