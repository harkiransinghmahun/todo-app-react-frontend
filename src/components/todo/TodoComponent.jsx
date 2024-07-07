import { useEffect, useState } from "react"
import { retrieveTodoForUser, updateTodoForUser, createTodoForUser } from "./api/TodoApiServiceCall"
import { useAuth } from "./security/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Formik, Field, ErrorMessage } from "formik"
import moment from "moment"

function TodoComponent(){

    const authContext = useAuth()
    const username = authContext.username
    const [description, setDescription] = useState("")
    const [targetDate, setTargetDate] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(
        () => retrieveTodo(), [id]
    )

    function retrieveTodo() {
        if (id != -1){
            retrieveTodoForUser(username, id)
            .then(respone => {
                setDescription(respone.data.description)
                setTargetDate(respone.data.targetDate)
            })
            .catch(error => {
                console.log(error)
            })
        }

    }

    function onSubmit(values){
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if (id != -1){
            updateTodoForUser(username, id, todo)
            .then(respone => {
                console.log(respone)
                navigate("/list-todos")
            })
            .catch(error => console.log(error))
        } else {
            createTodoForUser(username, todo)
            .then(respone => {
                console.log(respone)
                navigate("/list-todos")
            })
            .catch(error => console.log(error))
        }


    }

    function validate(values){
        let errors = {}

        if (values.description.length < 5){
            errors = {
                description: "Minimum characters in description is 5"
            }
        }

        if (values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid){
            errors.targetDate = "Please enter some target date"
        }

        return errors
    }

    return (
        <div className="container">
            <h1>Enter your todo details</h1>
            <Formik 
            initialValues={{description, targetDate}} 
            enableReinitialize={true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}>
                {
                    (props) => {
                        return (
                            <Form>

                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn btn-success m-5">Save</button>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default TodoComponent