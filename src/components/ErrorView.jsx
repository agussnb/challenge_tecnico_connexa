import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../components/contexts/LanguageContext"
import { useTasks } from "../components/contexts/TasksContext"

export const ErrorView = () => {
    const navigate = useNavigate()
    const { texts } = useLanguage()
    const { tasksLoaded } = useTasks()
    
    useEffect(() => {
        if (tasksLoaded) {
        navigate('/tasks');
        } else {
        navigate('/error'); 
        }
    }, [tasksLoaded, navigate]);

    return (
        <div className="errorDiv">
            <h1>{texts.errors.taskErrorMessage}</h1>
        </div>
    )
}
