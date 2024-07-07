import {retrieveHelloWorldBean, retrieveHelloWorldPathVariable} from "./api/HelloWorldApiCall";
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext";

function  WelcomeComponent(){

    const {username} = useParams()
    const [apiData, setApiData] = useState("")
    const authContext = useAuth()

    function handleButtonClick(){
        console.log("Clicked")
        retrieveHelloWorldPathVariable(username, authContext.token)
             .then(response => {
                console.log(response.data)
                setApiData(response.data)})
             .catch(error => setApiData(error.message))
             .finally(() => console.log("Finally called"))
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Your todos: <Link to="/list-todos">My Todos</Link>
            </div>
            <div>
                <button className="btn btn-success m-2" onClick={handleButtonClick}>Hello World</button>
            </div>
            <div className="text-info">
                {apiData}
            </div>
        </div>
    )
}

export default WelcomeComponent