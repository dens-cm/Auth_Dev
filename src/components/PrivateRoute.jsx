/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ children, publicOnly = false }) => {

    const { currentUser } = useAuth()
    const location = useLocation()

    if (currentUser && publicOnly) {
        return <Navigate to="/" />
    }

    if (!currentUser && !publicOnly) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children
}

export default PrivateRoute
