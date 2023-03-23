import { async } from 'q';
import { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import HTTP from '../API';


const Login = ({onLogin}) => {

    const [loginInfo, setLoginInfo] = useState({email:"", password:""});

    const loginChangeHandler = (e, field) =>{
        setLoginInfo((prevState)=>({...prevState, [field]: e.target.value}))
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const loginResult = await HTTP.post('/auth/login', loginInfo);

        localStorage.setItem("token", loginResult.token)

        console.log(loginResult);
        onLogin(true)
    }


    return (
       <div style={{width:"400px"}}>
         <Card>
            <Card.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" 
                        placeholder="Enter email" 
                        value={loginInfo.email}
                        onChange={(e)=> loginChangeHandler(e, 'email')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="Password" 
                        value={loginInfo.password} 
                        onChange={(e)=> loginChangeHandler(e, 'password')}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
       </div>
    )
}


export default Login;