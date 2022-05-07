import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    

    const { login, currentUser } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('');
            setLoading(true);
            // console.log(emailRef.current.value);
            await login(emailRef.current.value, passwordRef.current.value)
            // history.push("/")
            console.log(JSON.stringify(currentUser.email));
        } catch (error) {
            setError('Incorrect user details');
            console.log(error);
        }

        setLoading(false);

    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Login
                    </h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Button className="w-100 mt-4"
                            type="submit"
                            disabled={loading}>
                            {loading ? 'Logging In' : 'Login'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
