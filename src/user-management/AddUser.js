import React, { useEffect, useReducer, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";


const initialState = {
    user: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        status: false
    },
    showModel : false
}

const addUserReducer = (state, action) =>{
    const {type, payload } = action;

    console.log("Action in Reducer ", action);
    switch(type){
        case "OPEN_MODEL":
            return {
                ...state,
                showModel : true
            }
        case "CLOSE_MODEL":
            return {
                ...state,
                showModel : false
            }
        case "INPUT_CHANGE":
            return {
                ...state,
                 user: { ...state.user,  [payload.field]: payload.value }   
            }
        case "CHECKBOX_CHANGE":
            return {
                ...state,
                user: { ...state.user,  [payload.field]: !state.user[payload.field]} 

            }
        case "FORM_SUBMITTED":
            return {
                ...initialState
            }
        default:
            return {
                ...state
            }
    }
}


const AddUser = ({ onSave }) => {

   
    const[state, dispatch] = useReducer(addUserReducer, initialState)

    //Handle Input Changes
    const handleInputChange = (e, field) => {
        dispatch({ type: "INPUT_CHANGE", payload: { field, value: e.target.value }});
    }

    //Handle Checkbox Changes
    const handleCheckBoxChange = (e) => {
        dispatch({ type: "CHECKBOX_CHANGE", payload: {field:'status'}});
    }

    //Handle OnSubmit button
    const handleOnSubmit = () => {
        onSave(state.user); //Send Data to parent component
        dispatch({ type: "FORM_SUBMITTED"});
        
    }


    return (
        <div className="text-end addComponent" style={{ marginBottom: "10px" }}>
            <Button onClick={() =>  dispatch({type:"OPEN_MODEL"})}>Add User</Button>
            <Modal show={ state.showModel} onHide={() => dispatch({type:"CLOSE_MODEL"})}
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
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={state.user.fname} placeholder="Enter First Name" onChange={(e) => handleInputChange(e, 'fname')} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={state.user.lname} placeholder="Enter Last Name" onChange={(e) => handleInputChange(e, 'lname')} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={state.user.email} placeholder="Enter Email" onChange={(e) => handleInputChange(e, 'email')} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={state.user.phone} placeholder="Enter Phone Number" onChange={(e) => handleInputChange(e, 'phone')} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" checked={state.user.status} label="IsActive" onChange={handleCheckBoxChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={() => dispatch({type:"CLOSE_MODEL"})} >Close</Button>
                    <Button variant="primary" type="submit" onClick={handleOnSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default React.memo(AddUser);