import { useEffect, useState } from "react";

import AddUser from "./AddUser";
import EditUser from "./EditUser";
import UserList from "./UserList";

import HTTP from "../API";

const UserManagement = () =>{

    console.log("User Mangement Re rendered.......");

    const [users, setUsers] = useState([]);
    const [userUpdated, setUserUpdated] = useState(false);

    const [editUser, setEditUser] = useState(false);
    
    const [userToEdit, setUserToEdit] = useState()


    const getUsers = async()=>{
      const data =  await HTTP.get('/users');
      setUsers(data);
      setUserUpdated(false);
    }

    useEffect(()=>{
        getUsers();
    },[userUpdated])

    const onAddUser = async(user) =>{

        try{
            const data =  await HTTP.post('/users', user);

            console.log(data);

            user.id = data[0].insertId;

            setUsers((prevState)=>([...prevState, {...user}]));
        }catch(error){
            console.log(error.response.data);
        }

        
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
        await HTTP.delete(`/users/${id}`);
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