import { useEffect, useState } from "react";
import axios from 'axios';

import AddUser from "./AddUser";
import EditUser from "./EditUser";
import UserList from "./UserList";

const UserManagement = () =>{

    console.log("User Mangement Re rendered.......");

    const [users, setUsers] = useState([]);
    const [userUpdated, setUserUpdated] = useState(false);

    const [editUser, setEditUser] = useState(false);
    
    const [userToEdit, setUserToEdit] = useState()


    const getUsers = async()=>{
      const response =  await axios.get('http://localhost:4000/users');
      setUsers(response.data);
      setUserUpdated(false);
    }

    useEffect(()=>{
        getUsers();
    },[userUpdated])

    const onAddUser = async(user) =>{

        const response =  await axios.post('http://localhost:4000/users', user);

        console.log(response);

        setUserUpdated(true)
        //setUsers(response.data);

        // let id = 100;
        // if(users.length>0){
        //   const lastId = users[users.length-1].id;
        //   id = lastId+1;
        // }
        // user.id = id;
        // setUsers((prevState)=> ([...prevState, user]))
    }

    const onDelete = async(id) =>{
        const response =  await axios.delete(`http://localhost:4000/users/${id}`);
        setUserUpdated(true)
    }

    const onEdit = (id) =>{
        const userToEdit = users.find(user=> user.id ===id);
        setUserToEdit(userToEdit);
        setEditUser(true);
    }

    const onUpdate = (user) =>{
        const usersList = [...users];
        const index = usersList.findIndex((u => u.id == user.id));
        usersList[index] = {...user};
        setUsers(usersList)
        setEditUser(false)
        setUserToEdit(null)
    }

    const onUpdateCancel = () =>{
        setEditUser(false)
        setUserToEdit(null)
    }

    return(
        <>
            <h1>User Management Page</h1>
            <AddUser onSave={onAddUser}/>
            {editUser && <EditUser 
                userToEdit={userToEdit} 
                showModel={editUser} 
                onUpdate={onUpdate}
                onCancel={onUpdateCancel}/>}
            <UserList users={users} onDelete={onDelete} onEdit={onEdit}/>
        </>
    )
}


export default UserManagement;