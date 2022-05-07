import React from 'react';
import { Button, Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function Quill() {


    const { handleEditor, valueditor, Preview } = useAuth();

    // console.log(currentUser.email);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ font: [] }], [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
            ['code-block']
        ],
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'code-block'
    ]


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Quill editor</h2>
                    <ReactQuill theme="snow"
                        value={valueditor}
                        onChange={handleEditor}
                        modules={modules}
                        formats={formats}
                    />

                </Card.Body>
                <Button className="w-100 mt-4" onClick={Preview}>Preview</Button>
                <Button className="w-100 mt-1 btn-success">Publish</Button>
            </Card>
        </>
    )
}
