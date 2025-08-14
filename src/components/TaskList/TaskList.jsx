import './TaskList.css'
import { Button } from '../../components';

import { useNavigate } from 'react-router-dom';

export const TaskList = ({ tasks, texts, orderByPriority, orderByStatus, onDelete, onEdit, filterByStatus ,statusFilter,saveAsFavorite, favorite}) => {

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
                <Button label={texts.buttons.orderByPriority} parentMethod={orderByPriority} />
                <Button label={texts.buttons.orderByStatus} parentMethod={orderByStatus} />
            </div>
            <br />
            <div className="filter">
                <label htmlFor="options">{texts.selectOptions.label}</label>
                <br />
                <br />
                <select id='selectOptions' name={texts.selectOptions} onChange={(e)=>{filterByStatus(e.target.value)}}>
                    <option value="all">{texts.selectOptions.all} </option>
                    <option value="completed">{texts.selectOptions.completed}</option>
                    <option value="in progress">{texts.selectOptions.inProgress}</option>
                    <option value="pending">{texts.selectOptions.pending}</option>
                </select>
            </div>
            <div className="task-list-container">
                {tasks
                    .filter(task => statusFilter === 'all' || task.status === statusFilter).sort((a,b)=>favorite.includes(b.id)-favorite.includes(a.id)).map((task, index) => (
                        <div key={index} className="card">
                            <span className={`favoriteStar ${favorite.includes(task.id) ? 'favorite' : ''}`} onClick={() => saveAsFavorite(task.id)}>
                            {favorite.includes(task.id) ? '★' : '☆'}
                            </span>
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
                                <Button label={texts.buttons.edit} parentMethod={() => handleEditClick(task.id)} />
                                <Button label={texts.buttons.delete} parentMethod={() => onDelete(task.id)} />
                            </div>
                            <hr />
                        </div>
                    ))
                }
            </div>

        </>
    );
};
