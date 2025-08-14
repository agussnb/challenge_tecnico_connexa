import './TaskList.css';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../contexts/TasksContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';

export const TaskList = () => {
  const { tasks, orderByPriority, orderByStatus, deleteTask, setTaskBeingEdited , tasksLoaded} = useTasks();
  const { texts } = useLanguage();

  const navigate = useNavigate();

  useEffect(()=>{
    if (tasksLoaded === false){
      navigate('/error')
    }
  })

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

  const handleEditClick = (task) => {
    setTaskBeingEdited(task); // ❗ ahora guardamos la tarea a editar
    navigate('/tasks/' + task.id);
  };

  return (
    <>
      <br />
      <br />
      <div className="buttons">
        <Button label={texts.buttons.orderByPriority} parentMethod={orderByPriority} />
        <Button label={texts.buttons.orderByStatus} parentMethod={orderByStatus} />
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
              <Button label={texts.buttons.edit} parentMethod={() => handleEditClick(task)} />
              <Button label={texts.buttons.delete} parentMethod={() => deleteTask(task.id)} />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};
