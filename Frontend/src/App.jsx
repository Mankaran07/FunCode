import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp  from './components/SignUp'
import SignIn from './components/SignIn';
import AppBar from './components/AppBar'
import AddCourse from './components/AddCourse';
import Landing from './components/Landing'
const App = () => {
  return (
    <div className='main-body'>
        <Router>
          <AppBar/>
          <Routes>
            <Route path={"/"} element={<Landing/>}/>
            <Route path={"/addcourse"} element={<AddCourse/>}/>
            <Route path={"/signin"} element={<SignIn/>}/>
            <Route path={"/signup"} element={<SignUp/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
