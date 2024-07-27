// import React from 'react'
import { Alert, Button, Card, CardBody, CardHeader, FormControl, FormHelperText, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        }

        catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No account found with this email')
            } 
            
            else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password')
            } 
            
            else {
                setError('Failed to login')
            }
        }   

        setLoading(false)
    }

    return (
        <Card>
            <CardHeader>
                <Heading>Login</Heading>
            </CardHeader>
            <CardBody>
            {error && <Alert status='error'>{error}</Alert>}
                <form onSubmit={handleLogin}>
                    <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Input type="email" required ref={emailRef}></Input>
                        <FormLabel>Password:</FormLabel>
                        <Input type="password" required ref={passwordRef}></Input>
                        <Button type='submit' disabled={loading} w={'100%'} margin={'2% 0 0 0'} bg={'blue'} color={'white'}>Login</Button>
                        <Link style={{color: 'blue'}} to='/forgot-password'>Forgot password?</Link>
                        <FormHelperText>
                            <Text query='Signup' styles={{color: 'blue', cursor: 'pointer'}}>Dont have an account? <Link to='/signup' style={{color: 'blue'}}>Signup</Link></Text>
                        </FormHelperText>
                    </FormControl>
                </form>
            </CardBody>
        </Card>
    )
}
