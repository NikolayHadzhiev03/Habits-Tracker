import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import {Routes , Route} from 'react-router'
function App() {


  return (
    <>
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
</Routes>
    </>
  )
}

export default App
