import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Login(){
    const navigate = useNavigate();
    
    const[credentials, setCredentials] = useState({
        email:"",
        password:""
    });

    function handleChange(e){
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e){
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:5000/login",{
                method : "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const result = await response.json();
        
            if(response.ok){
                alert(result.message);
                localStorage.setItem("token", result.token);
                navigate("/dashboard");
            }else{
                alert(`Login failed : ${result.message}`);
            }
        }catch(error){
            alert("Error connecting to server");
            console.error("Login error", error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login Page</h2>
                <input type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={handleChange}/>
                <br/>
                <input type="password" placeholder="Enter password" name="password" value={credentials.password} onChange={handleChange}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}