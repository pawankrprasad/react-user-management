import logo from './logo.svg';
import './App.css';
import UserManagement from './user-management/UserManagement';
import Login from './Login/Login';
import { useEffect, useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{padding:"50px"}}>
      {isLoggedIn ? <UserManagement/> : <Login onLogin = {setIsLoggedIn}/>}  
    </div>
  );
}

export default App;
