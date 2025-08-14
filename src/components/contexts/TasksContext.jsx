import { useContext, createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2'

const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [originalTasks, setOriginalTasks] = useState([])
    const [taskBeingEdited, setTaskBeingEdited] = useState(null)
    const [tasksLoaded, setTasksLoaded] = useState(false)
    const [prioritySortMode, setPrioritySortMode] = useState('none')
    const [statusSortMode, setStatusSortMode] = useState('none')
    const [statusFilter, setStatusFilter] = useState('all')
    const [favorite, setFavorite] = useState([])
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('screenMode' || 'dark')
    })

    useEffect(() => {
        const stored = localStorage.getItem('tasks');
        const storedTasks = stored ? JSON.parse(stored) : [];
        setTasks(storedTasks);
        setOriginalTasks(storedTasks);
        setTasksLoaded(storedTasks.length > 0);
    }, []);

    useEffect(() => {
        setTasksLoaded(tasks.length > 0)
    }, [tasks])

    useEffect(() => {
        document.body.className = darkMode === 'dark' ? 'dark' : 'light';
        }, [darkMode]);

    const changeMode = (mode) => {
        setDarkMode(mode)
        localStorage.setItem('screenMode', mode)
    }

    const addTask = (task, texts) => {
        const newTask = { ...task, id: crypto.randomUUID() }
        const updatedTasks = [...tasks, newTask]
        setTasks(updatedTasks)
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        Swal.fire({
            title: texts.form.alerts.saved,
            text: texts.form.alerts.savedDescription
        })
    }

    const editTask = (task, texts) => {
        const updatedTasks = tasks.map((t) => {
            if (t.id === task.id) {
                Swal.fire({
                    title: texts.form.alerts.edited,
                    text: texts.form.alerts.editedDescription
                })
                return task
            } else return t
        })
        setTasks(updatedTasks)
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    }

    const deleteTask = (id) => {
        const updated = tasks.filter((task) => task.id !== id)
        setTasks(updated)
        localStorage.setItem('tasks', JSON.stringify(updated))
    }

    const orderByPriority = () => {
        const order = { high: 3, medium: 2, low: 1 }
        let sortedTasks = []
        if (prioritySortMode === 'none') {
            sortedTasks = [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
            setPrioritySortMode('asc');
        } else if (prioritySortMode === 'asc') {
            sortedTasks = [...tasks].sort((a, b) => order[b.priority] - order[a.priority]);
            setPrioritySortMode('desc');
        } else if (prioritySortMode === 'desc') {
            sortedTasks = [...originalTasks];
            setPrioritySortMode('none');
        }

        setTasks(sortedTasks);
    }

    const orderByStatus = () => {
        const order = { completed: 3, 'in progress': 2, pending: 1 }
        let sortedTasks = []
        if (statusSortMode === 'none') {
            sortedTasks = [...tasks].sort((a, b) => order[a.status] - order[b.status])
            setStatusSortMode('asc')
        } else if (statusSortMode === 'asc') {
            sortedTasks = [...tasks].sort((a, b) => order[b.status] - order[a.status])
            setStatusSortMode('desc')
        } else if (statusSortMode === 'desc') {
            sortedTasks = [...originalTasks]
            setStatusSortMode('none')
        }
        setTasks(sortedTasks)
    }

    const filterByStatus = (selectedStatus) => {
        setStatusFilter(selectedStatus)
    }

    const saveAsFavorite = (taskId) => {
        setFavorite(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    return (
        <TasksContext.Provider
            value={{
                tasks,
                taskBeingEdited,
                setTaskBeingEdited,
                tasksLoaded,
                addTask,
                editTask,
                deleteTask,
                orderByPriority,
                orderByStatus,
                filterByStatus,
                statusFilter,
                changeMode,
                darkMode,
                saveAsFavorite,
                favorite
            }}
        >
            {children}
        </TasksContext.Provider>
    );

}

export const useTasks = () => useContext(TasksContext);