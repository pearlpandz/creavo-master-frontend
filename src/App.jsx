import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { lightTheme, darkTheme } from './theme'
import Login from './pages/login'
import Signup from './pages/signup'
import ForgetPassword from './pages/forgetpassword'
import Home from './pages/home'
import Network from './pages/network'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import { AuthContext } from './context/auth.context'
import License from './pages/license'
import Subscription from './pages/subscription'

function ProtectedRoute({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function ProtectedLayout({ isAuthenticated, sidebarOpen, setSidebarOpen, onToggleTheme, darkMode }) {

  return isAuthenticated ? (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f6fd', overflow: 'hidden', width: "-webkit-fill-available" }}>
      <Sidebar open={sidebarOpen} />
      <div style={{ width: sidebarOpen ? "calc(100% - 220px)" : "auto", flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', marginLeft: sidebarOpen ? 220 : 0, transition: 'margin-left 0.3s' }}>
        <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} onToggleTheme={onToggleTheme} darkMode={darkMode} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>

  ) : <Navigate to="/login" replace />
}

function BasicLayout({ toggleTheme }) {
  return (
    <>
      <button onClick={toggleTheme} style={{ position: 'absolute', top: 16, right: 16, zIndex: 999 }}>Toggle Theme</button>
      <Outlet />
    </>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Apply authentication logic
  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true' || false);
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')) || null);

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleTheme = () => setDarkMode((prev) => !prev)

  const login = (data) => {
    setAuthenticated(true)
    setUserDetails(data)
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userDetails', JSON.stringify(data));
  }

  const logout = () => {
    setAuthenticated(false)
    setUserDetails(null)
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userDetails');
  }

  // useEffect(() => {
  //   const getCSRFToken = async () => {
  //     try {
  //       await axios.get('http://localhost:8000/get_csrf', { withCredentials: true })
  //     } catch (error) {
  //       console.error('Error fetching CSRF token:', error);
  //     }
  //   }
  // getCSRFToken()
  // }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AuthContext.Provider value={{ isAuthenticated, userDetails, login, logout }}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route element={<BasicLayout toggleTheme={toggleTheme} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Route>
            <Route
              element={
                <ProtectedLayout
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  isAuthenticated={isAuthenticated}
                  onToggleTheme={toggleTheme}
                  darkMode={darkMode}
                />
              }
            >
              <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/" element={<Home />} />
                <Route path="/networks" element={<Network />} />
                <Route path="/licenses" element={<License />} />
                <Route path="/subscriptions" element={<Subscription />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App