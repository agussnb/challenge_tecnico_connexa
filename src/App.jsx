import { useEffect, useState } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { NavBar, Router } from './components';
import Swal from 'sweetalert2';
import './App.css';
import langSpanish from './lang_spanish.json';
import langEnglish from './lang_english.json';

function App() {
  const storedLang = localStorage.getItem('language') || 'es';
  const [language, setLanguage] = useState(storedLang);
  const [tasks, setTasks] = useState([]);
  const [prioritySortMode, setPrioritySortMode] = useState('none')
  const [statusSortMode, setStatusSortMode] = useState('none')
  const [originalTasks, setOriginalTasks] = useState([])
  const [taskBeingEdited, setTaskBeingEdited] = useState(null)
  const [tasksLoaded, setTasksLoaded] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [favorite, setFavorite] = useState([])
  const [darkMode, setDarkMode] = useState(()=>{
    return localStorage.getItem('screenMode' || 'dark')
  })
  const texts = language === 'es' ? langSpanish : langEnglish;

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const changeMode = (mode) =>{
    setDarkMode(mode)
    localStorage.setItem('screenMode',mode)
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem('tasks');
      const parsedTasks = stored ? JSON.parse(stored) : [];
      setTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
    } catch (error) {
      console.error('Error parsing tasks from localStorage', error);
      setTasks([]);
    }
}, []);

  useEffect(() => {
    setOriginalTasks(tasks);
  }, [tasks.length]);

  useEffect(() => {
    if (tasks.length != 0){
      setTasksLoaded(true)
    }
    else{
      setTasksLoaded(false)
    }
  }, [tasks]);

  useEffect(() => {
  document.body.className = darkMode === 'dark' ? 'dark' : 'light';
}, [darkMode]);


  const addTask = (task) => {
    const newTask = { ...task, id: crypto.randomUUID() };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    Swal.fire({
      title:texts.form.alerts.saved,
      text: texts.form.alerts.savedDescription
    })
  };

  const editTask = (task) => {
    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) {
        Swal.fire({
        title:texts.form.alerts.edited,
        text: texts.form.alerts.editedDescription
      })
      return task;
      } else {
        return t;
      }
    });

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => id === task.id)
    setTaskBeingEdited(taskToEdit)
  }

  const orderByPriority = () => {
    const order = { high: 3, medium: 2, low: 1 };
    let sortedTasks = [];

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
  };

  const orderByStatus = () => {
    const order = {completed:3, 'in progress':2, pending: 1}
    
    let sortedTasks = []
    if (statusSortMode === 'none'){
      sortedTasks = [...tasks].sort((a,b)=> order[a.status] - order[b.status])
      setStatusSortMode('asc')
    } else if (statusSortMode === 'asc'){
      sortedTasks = [...tasks].sort((a,b)=> order[b.status] - order[a.status])
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
    <BrowserRouter>
      <div className={darkMode === 'dark' ? 'dark' : 'light'}>
        <NavBar texts={texts.navbar} changeLanguage={changeLanguage} changeMode={changeMode} darkMode={darkMode}/>
        <Router tasks={tasks} addTask={addTask} onDelete={handleDeleteTask} texts={texts} onEdit={handleEditTask} onEditTask={editTask} orderByPriority={orderByPriority} orderByStatus={orderByStatus} tasksLoaded={tasksLoaded} filterByStatus={filterByStatus} statusFilter={statusFilter} saveAsFavorite={saveAsFavorite} favorite={favorite}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
