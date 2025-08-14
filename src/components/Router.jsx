import {Routes, Route} from 'react-router-dom'
import {TaskForm} from './'
import {Task} from './'
import {TaskList} from './'
import {ErrorView} from './'

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<TaskForm />} />
      <Route path='/tasks' element={<TaskList />} />
      <Route path='/tasks/:id' element={<Task />} />
      <Route path='/error' element={<ErrorView />} />
    </Routes>
  );
};
