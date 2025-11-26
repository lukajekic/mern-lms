import './App.css'
import {Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Course from './pages/Course'
import Lesson from './pages/Lesson'
import Assignment from './pages/Assignment'
import { Toaster } from 'react-hot-toast'
import AssignmentNC from './pages/AssignmentNC.JSX'
import UploadNC from './pages/UploadNC'
import UploadDEV from './pages/uploaddev'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminHome from './pages/AdminHome'
import Welcome from './pages/Welcome'
function App() {
return (
  <div>
    <Toaster></Toaster>
     <Routes>
    
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/course/:id' element={<Course></Course>}></Route>
    <Route path='/lesson/:id' element={<Lesson></Lesson>}></Route>
    <Route path='/assignment/:id/code' element={<Assignment></Assignment>}></Route>
    <Route path='/assignment/:id/view' element={<AssignmentNC></AssignmentNC>}></Route>
    <Route path='/assignment/:id/upload' element={<UploadNC></UploadNC>}></Route>
        <Route path='/tasks/:id' element={<Tasks></Tasks>}></Route>

    <Route path='/devupload' element={<UploadDEV></UploadDEV>}></Route>

    <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/teacher/home' element={<AdminHome></AdminHome>}></Route>
        <Route path='/welcome' element={<Welcome></Welcome>}></Route>

  </Routes>
  </div>
 
)
}

export default App
