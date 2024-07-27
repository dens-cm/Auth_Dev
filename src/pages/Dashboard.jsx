// import React from 'react'
import { Alert, Box, Button, Heading, Input, Text } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {

    const { currentUser, logout, deleteAccount } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) {
            setIsEmailVerified(currentUser.emailVerified)
        }
    }, [currentUser])

    useEffect(() => {
        const checkEmailVerification = async () => {
            if (currentUser) {
                await currentUser.reload()
                setIsEmailVerified(currentUser.emailVerified);
            }
        }
    
        const intervalId = setInterval(checkEmailVerification, 1000)
    
        return () => clearInterval(intervalId)
    }, [currentUser])

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        }
        
        catch {
            setError("Failed to logout")
        }
    }

    async function handleDeleteAccount() {
        setError('')
        setLoading(true)

        try {

            if(setPassword === "") {
                setError('Enter your password to delete account')
            }

            else {
                await deleteAccount(password)
                navigate('/login')
            }
        }
        
        catch (error) {
            
            if (error.code === 'auth/wrong-password') {
                setError('Incorrect password')
            } 
            
            else {
                setError('Failed to to delete account')
            }
        }

        setLoading(false)
    }

    return (
        <Box>
            <Heading>Welcome!</Heading>
            <Text>{currentUser.email}</Text> 
            {isEmailVerified ? (
                <>
  
                    <Link to='/update-profile'>
                        <Button>Update Profile</Button>
                    </Link>
                    <Input type="password" placeholder="Enter your password to delete account" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={handleDeleteAccount} colorScheme="red" isLoading={loading}>Delete Account</Button>
            
                </>
            ) : (
                <Text>Your email is not verified. Please verify your email to access this feature.</Text>
            )}
            <Button onClick={handleLogout}>Logout</Button>
            {error && <Alert status='error'>{error}</Alert>}
        </Box>
    )
}
