import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Loader } from './components/Loader';

function App() {

  const { token, userId, login, logout, ready } = useAuth()
  const isAuthenticated = true
  const routes = useRoutes(isAuthenticated)

  if(!ready){
    return (
      <Loader />
    )
  }
  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
      <Router>
        <Navbar isAuth={isAuthenticated} />
        <div className="container">
          { routes }
        </div>
      </Router>
    </AuthContext.Provider>
  )
}


export default App;
