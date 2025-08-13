import { useParams } from "react-router-dom";
import {TaskForm} from '../'
export const Task = ({ texts, textsButtons, tasks, onEditTask ,onAddTask}) => {
  const { id } = useParams();
  const task = tasks.find(task => task.id === id);

  return (
    <div className="card">
      <TaskForm
        texts={texts}
        textsButtons={textsButtons}
        onEditTask={onEditTask} 
        taskBeingEdited={task}
        onAddTask={onAddTask} 
      />
    </div>
  );
}
