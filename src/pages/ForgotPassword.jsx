// import React from 'react'
import { Alert, Button, Card, CardBody, CardHeader, FormControl, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState("")
    const [ message, setMessage ] = useState()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Reset password link sent, check your email.")
        } 
        
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No account found with this email')
            } 
            
            else {
                setError("Failed to process request")
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <Heading>Reset Password</Heading>
            </CardHeader>
            <CardBody>
            {error && <Alert status='error'>{error}</Alert>}
            {message && <Alert status='success'>{message}</Alert>}
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Input type="email" required ref={emailRef}></Input>
                        <Button type='submit' disabled={loading} w={'100%'} margin={'2% 0 0 0'} bg={'blue'} color={'white'}>Confirm</Button>
                        <FormHelperText>
                            <Link to='/login' style={{color: 'blue'}}>Login</Link>
                        </FormHelperText>
                    </FormControl>
                </form>
            </CardBody>
        </Card>
    )
}
