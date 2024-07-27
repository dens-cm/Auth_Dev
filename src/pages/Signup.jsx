import { useRef, useState } from 'react'
import { Alert, Button, Card, CardBody, CardHeader, FormControl, FormHelperText, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { sendEmailVerification } from 'firebase/auth'

export default function Signin() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    async function handleSignin(e) {
        e.preventDefault()
        
        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match!')
        }

        try {
            setError('')
            setLoading(true)
            const userCredential = await signup(emailRef.current.value, passwordRef.current.value)
            const user = userCredential.user
            await sendEmailVerification(user)
            navigate('/')
        }

        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Email is already in use')
            }
            
            else {
                setError('Failed to create an account')
            }
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <Heading>Create your account</Heading>
                </CardHeader>
                <CardBody>
                    {error && <Alert status='error'>{error}</Alert>}
                    <form onSubmit={handleSignin}>
                        <FormControl>
                            <FormLabel>Email:</FormLabel>
                            <Input type="email" required ref={emailRef}></Input>
                            <FormLabel>Password:</FormLabel>
                            <Input type="password" required ref={passwordRef}></Input>
                            <FormLabel>Confirm password:</FormLabel>
                            <Input type="password" required ref={confirmPasswordRef}></Input>
                            <Button type='submit' disabled={loading} w={'100%'} margin={'2% 0 0 0'} bg={'blue'} color={'white'}>Signin</Button>
                            <FormHelperText>
                                <Text query='Login' styles={{color: 'blue', cursor: 'pointer'}}>Already have an account? <Link to='/login' style={{color: 'blue'}}>Login</Link></Text>
                            </FormHelperText>
                        </FormControl>
                    </form>
                </CardBody>
            </Card>
        </>
    )
}
