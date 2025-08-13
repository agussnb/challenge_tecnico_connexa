import { Routes, Route , Navigate} from 'react-router-dom'
import { TaskForm } from './'
import { TaskList } from './'
import { Task } from './'
import { ErrorView } from './'

export const Router = ({ tasks, addTask, texts, onDelete, onEdit , onEditTask, orderByPriority, orderByStatus, tasksLoaded}) => {
    
    return (
        <Routes>
            <Route
                path='/' element={<TaskForm onAddTask={addTask} texts={texts.form} textsButtons={texts.buttons} />} />
            <Route path='/tasks' element={tasksLoaded ? <TaskList tasks={tasks} texts={texts} onDelete={onDelete} onEdit={onEdit}orderByPriority={orderByPriority} orderByStatus={orderByStatus}/> : <Navigate to="/error" />}/>
            <Route
                path='/tasks/:id'
                element={<Task texts={texts.form} textsButtons={texts.buttons} tasks={tasks} onEditTask={onEditTask} onDelete={onDelete} onAddTask={addTask}/>}/>
            <Route path='/error' element={<ErrorView textsErrors={texts.errors} tasksLoaded={tasksLoaded}/>}/>

        </Routes>
    )
}
