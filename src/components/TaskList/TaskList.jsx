import './TaskList.css'
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';

export const TaskList = ({ tasks, texts ,orderByPriority, orderByStatus, onDelete, onEdit}) => {

    const priorityTranslations = {
        low: texts.form.priorityLow,
        medium: texts.form.priorityMedium,
        high: texts.form.priorityHigh,
    };

    const statusTranslations = {
        pending: texts.form.statusPending,
        "in progress": texts.form.statusInProgress,
        completed: texts.form.statusCompleted,
    };

    const navigate = useNavigate()

    const handleEditClick = (id) => {
    onEdit(id);    
    navigate('/tasks/' + id);
  };

    return (
        <>
        <br />
        <br />
        <div className="buttons">
            <Button label={texts.buttons.orderByPriority} parentMethod={orderByPriority}></Button>
            <Button label={texts.buttons.orderByStatus} parentMethod={orderByStatus}></Button>
        </div>
        <div className="task-list-container">
            {tasks.map((task, index) => (
                <div key={index} className="card">
                    <h3>{texts.taskList.taskTitle}: {task.title}</h3>
                    <p>{task.description}</p>
                    <hr />
                    <p>{texts.taskList.dueDateLabel}: {task.dueDate}</p>
                    <hr />
                    <p>{texts.taskList.priorityLabel}: {priorityTranslations[task.priority] || task.priority}</p>
                    <hr />
                    <p>{texts.taskList.statusLabel}: {statusTranslations[task.status] || task.status}</p>
                    <hr />
                    <div className="taskButtons">
                        <Button label={texts.buttons.edit} parentMethod={() => handleEditClick(task.id)}></Button>
                        <Button label={texts.buttons.delete} parentMethod={()=>onDelete(task.id)}></Button>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
        </>
    );
};
