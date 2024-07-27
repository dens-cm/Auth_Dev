import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import UpdateProfile from './pages/UpdateProfile'
import PrivateRoute from './components/PrivateRoute'
import { Box } from '@chakra-ui/react'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <Box w={'100vw'} h={'100vh'}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path='*' element={<Navigate to="/" />}/>
            <Route exact path='/' element={<PrivateRoute> <Dashboard/> </PrivateRoute>}/>
            <Route path='/update-profile' element={<PrivateRoute> <UpdateProfile/> </PrivateRoute>}/>
            <Route path='/signup' element={<PrivateRoute publicOnly={true}> <Signup/> </PrivateRoute>}/>
            <Route path='/login' element={<PrivateRoute publicOnly={true}> <Login/> </PrivateRoute>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </Box>
  )
}

export default App
