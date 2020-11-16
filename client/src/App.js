import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";



function App() {
  const {token, userId, login, logout, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        { isAuthenticated ? <Navbar /> : null}
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
