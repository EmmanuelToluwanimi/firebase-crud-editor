import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    // const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();

    // console.log(currentUser.email);


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {/* {error && <Alert variant='danger'>{error}</Alert>} */}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
                    <Link to='/quill' className='btn btn-success w-100 mt-3'>React-quill-editor</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={() => logout()}>Log Out</Button>
            </div>
        </>
    )
}
