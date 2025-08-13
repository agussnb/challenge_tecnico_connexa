import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ErrorView = ({textsErrors, tasksLoaded}) =>{
     const navigate = useNavigate()
     useEffect(()=>{
        if (tasksLoaded){
        navigate('/tasks')
     }
     },[tasksLoaded])

    return(
        <div className="errorDiv">
            <h1>{textsErrors.taskErrorMessage}</h1>
        </div>
    )
}