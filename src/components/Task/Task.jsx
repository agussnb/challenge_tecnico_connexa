import { useParams } from "react-router-dom";
import { TaskForm } from "../";
import { useTasks} from "../contexts/TasksContext";
import { useLanguage } from "../contexts/LanguageContext";

export const Task = () => {
  const { id } = useParams();
  
  const { tasks, onEditTask, onAddTask } = useTasks();
  const { texts, textsButtons } = useLanguage();

  const task = tasks.find((task) => task.id === id);
  console.log(texts.form)
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
};
