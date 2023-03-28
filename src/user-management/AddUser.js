import React, { useEffect, useReducer, useRef } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

import { 
    addUserReducer,
    initialState,
    modelOpen,
    modelClose,
    inputChange,
    checkBoxChange,
    formSubmit
} from '../reducers/addUserReducer';


const AddUser = ({ onSave }) => {
   
    const [state, dispatch]  = useReducer(addUserReducer, initialState);

    const phoneInput = useRef();


    //Handle OnSubmit button
    const handleOnSubmit = () => {
        onSave(state); //Send Data to parent component
        dispatch(formSubmit())
    }

    const handlePhoneInput = () =>{
        phoneInput.current.value = "AFsdfsadfs";
    }

    const inputChangeHandler = (e, field) => dispatch(inputChange({field, value: e.target.value}))

    return (
        <div className="text-end addComponent" style={{ marginBottom: "10px" }}>

            

            <Button onClick={() => dispatch(modelOpen())}>Add User</Button>
            <Modal show={state.showModel} onHide={() => dispatch(modelClose())}
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
                    <Button onClick={handlePhoneInput}>Access PHone Number Input Box</Button>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={state.fname} placeholder="Enter First Name" onChange={(e) =>inputChangeHandler(e, 'fname')} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={state.lname} placeholder="Enter Last Name" onChange={(e) =>  dispatch(inputChange({field: 'lname', value: e.target.value}))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={state.email} placeholder="Enter Email" onChange={(e) =>  dispatch(inputChange({field: 'email', value: e.target.value}))} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control ref={phoneInput} type="text" value={state.phone} placeholder="Enter Phone Number" onChange={(e) =>  dispatch(inputChange({field: 'phone', value: e.target.value}))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" checked={state.status} label="IsActive" onChange={() =>  dispatch(checkBoxChange({field: 'status'}))} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={() => dispatch(modelClose())} >Close</Button>
                    <Button variant="primary" type="submit" onClick={handleOnSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default React.memo(AddUser);