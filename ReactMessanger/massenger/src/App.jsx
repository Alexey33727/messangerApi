import './App.css';
import { Login } from './pages/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Register } from './pages/Register/Register';
import { Home } from './pages/Home/Home';
import { useContext } from 'react';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import axios, { Axios, AxiosHeaders } from 'axios';

const App = () => {


  const ProtactedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    if (currentUser.user === 'AnonymousUser' || localStorage.getItem('refresh') === null) {
      return <Navigate to={'/login'} />
    }
    return children
  }

  return (
    <section className='app'>
      <Routes>
        <Route path='/'>
          <Route index path='' element={<AuthContextProvider><ChatContextProvider><ProtactedRoute><Home /></ProtactedRoute></ChatContextProvider></AuthContextProvider>} />
          <Route path="login" element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
