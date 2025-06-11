import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Header from './Components/HeaderandFooter/Header'
import Register from './Components/Register/Register'
import {Routes , Route} from 'react-router'
import Footer from './Components/HeaderandFooter/Footer'
function App() {


  return (
    <>
    <Header />
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
</Routes>
<Footer />
    </>
  )
}

export default App
