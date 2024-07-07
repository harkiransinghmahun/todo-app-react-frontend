import { useAuth } from "./security/AuthContext"

function LogoutComponent(){

    const authContext = useAuth()
    authContext.logout()

    return (
        <div className="LogoutComponent">
            <h1>You are logged out!</h1>
            <div>Thanks for using our app. Visit us again</div>
        </div>
    )
}

export default LogoutComponent