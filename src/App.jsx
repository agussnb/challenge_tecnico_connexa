
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { NavBar, Router } from './components';
import {LanguageProvider} from './components/contexts/LanguageContext'
import {TasksProvider} from './components/contexts/TasksContext'

import './App.css';

function App() {
  

  return (
    <LanguageProvider>
      <TasksProvider>
        <BrowserRouter>
          <NavBar/>
          <Router/>
        </BrowserRouter>
      </TasksProvider>
    </LanguageProvider>
  );
}

export default App;
