import { useEffect } from "react";
import { Table, Badge } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Status = ({ status }) => {
    return (
        <Badge bg={status ? 'success' : 'danger'}>
            {status ? "Active" : 'InActive'}
        </Badge>
    )
}

const UserList = ({ users, onEdit, onDelete }) => {

    console.log("User List Re rendered.......");

    const getUserList = () =>{
        console.log("Get user list from api")
    }

    // useEffect(()=>{
    //     getUserList();
    // },[])

    return (
       
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.fname}</td>
                                <td>{item.lname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td><Status status={item.status} /></td>
                                <td>
                                    <span style={{ margin: "5px" }}>
                                        <FaEdit onClick={() => onEdit(item.id)} />
                                    </span>
                                    <span style={{ margin: "5px" }}>
                                        <FaTrashAlt onClick={() => onDelete(item.id)} />
                                    </span>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
    
    )
}

export default UserList;