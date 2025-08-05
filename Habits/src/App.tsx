import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Header from './Components/HeaderandFooter/Header'
import Register from './Components/Register/Register'
import { Routes, Route } from 'react-router'
import Footer from './Components/HeaderandFooter/Footer'
import Profile from './Components/Profile/profile'
import Habits from './Components/Habits/habits'
import CreateHabit from './Components/addHabit/addHabit'
import IsAuthGuard from './Guards/isAuthGuard'
import NotFound404 from './Components/404/errorPage'
import IsGuest from './Guards/guestGuard'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route element={<IsGuest />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Habits />} />
          <Route path="*" element={<NotFound404 />} />

          <Route element={<IsAuthGuard />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-habit" element={<CreateHabit />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
