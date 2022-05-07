import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

export default function Previex() {
    // const [error, setError] = useState('');
    // const { valueEditor } = useAuth();
    const { content } = useParams()

    useEffect(() => {
        console.log(String(content));
    }, [content]);

    return (
        <>
            <Card>
                {/* <Card.Body dangerouslySetInnerHTML={{__html: toString(content)}}>
                    
                </Card.Body> */}
            </Card>

        </>
    )
}
