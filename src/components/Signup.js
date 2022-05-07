import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, currentUser } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        } else {
            try {
                setError('');
                setLoading(true);
                await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
                console.log(JSON.stringify(currentUser.email));
            } catch {
                setError('Failed to create an account ')
            }
        }

        setLoading(false);

    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Sign Up
                    </h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" ref={usernameRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button className="w-100 mt-4"
                            type="submit"
                            disabled={loading}>
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}
