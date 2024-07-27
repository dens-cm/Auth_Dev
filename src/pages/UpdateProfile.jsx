import { Alert, Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { useRef, useState } from "react"

export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const navigate = useNavigate()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ loading, setLoading ] = useState(false)

    async function handleEmailUpdate(newEmail) {
        await updateEmail(newEmail)
        await currentUser.sendEmailVerification()
    }

    function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match!')
        }

        const promises = []
        setLoading(true)
        setError('')
        setMessage('')
        if(emailRef.current.value !== currentUser.email) {
            promises.push(handleEmailUpdate(emailRef.current.value))
        }

        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            setMessage('Updated successfully')
            navigate('/')
        }).catch(() => {
            setError('Failed to update account')    
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Card>
            <CardHeader>
                <Heading>Update Profile</Heading>
            </CardHeader>
            <CardBody>
            {error && <Alert status='error'>{error}</Alert>}
            {message && <Alert status='success'>{message}</Alert>}
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Input type="email" required ref={emailRef} defaultValue={currentUser.email}></Input>
                        <FormLabel>Password:</FormLabel>
                        <Input type="password" ref={passwordRef} placeholder="Leave blank to keep same"></Input>
                        <FormLabel>Confirm password:</FormLabel>
                        <Input type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep same"></Input>
                        <Button type='submit' disabled={loading} w={'100%'} margin={'2% 0 0 0'} bg={'blue'} color={'white'}>Update</Button>
                        <Link style={{color: 'blue'}} to='/'>Cancel</Link>
                    </FormControl>
                </form>
            </CardBody>
        </Card>
    )
}
