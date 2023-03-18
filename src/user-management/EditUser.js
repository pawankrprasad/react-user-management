import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const EditUser = ({ userToEdit, showModel, onUpdate, onCancel }) => {

    const [user, setUser] = useState(userToEdit)

    const handleInputChange = (e, field) => {
        setUser((prevState) => ({ ...prevState, [field]: e.target.value }))
    }

    const handleCheckBoxChange = (e) => {
        setUser((prevState) => ({ ...prevState, status: !prevState.status }))
    }

    return (
        <div className="text-end" style={{ marginBottom: "10px" }}>
            <Modal show={showModel} onHide={onCancel}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <Button variant="default" onClick={onCancel} >Close</Button>
                    <Button variant="primary" type="submit" onClick={()=> onUpdate(user)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditUser;