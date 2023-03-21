import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

const AddUser = ({ onSave }) => {

    console.log("Add User Re rendered.......");

    const initialState = {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        status: false
    }

    const [show, setShow] = useState(false)
    const [user, setUser] = useState(initialState)

    const [error, setError] = useState(false)

    // useEffect(()=>{
    //     if(user.fname.length > 10){
    //         setError(true);
    //     }
    //     return ()=>{
    //         setError(false);
    //     }
    // },[user])

    //Handle Input Changes
    const handleInputChange = (e, field) => {
        setUser((prevState) => ({ ...prevState, [field]: e.target.value }))
    }

    //Handle Checkbox Changes
    const handleCheckBoxChange = (e) => {
        setUser((prevState) => ({ ...prevState, status: !prevState.status }))
    }

    //Handle OnSubmit button
    const handleOnSubmit = () => {
        onSave(user); //Send Data to parent component
        setShow(false) // Hide Model Popup
        setUser(initialState) // Reset state value to clear form
    }


    return (
        <div className="text-end addComponent" style={{ marginBottom: "10px" }}>
            <Button onClick={() => setShow(true)}>Add User</Button>
            <Modal show={show} onHide={() => setShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create New User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>
                    Some of the inputs are not valid
                </Alert>}
                
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={user.fname} placeholder="Enter First Name" onChange={(e) => handleInputChange(e, 'fname')} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={user.lname} placeholder="Enter Last Name" onChange={(e) => handleInputChange(e, 'lname')} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={user.email} placeholder="Enter Email" onChange={(e) => handleInputChange(e, 'email')} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={user.phone} placeholder="Enter Phone Number" onChange={(e) => handleInputChange(e, 'phone')} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" checked={user.status} label="IsActive" onChange={handleCheckBoxChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={() => setShow(false)} >Close</Button>
                    <Button variant="primary" type="submit" onClick={handleOnSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default React.memo(AddUser);