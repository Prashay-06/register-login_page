import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


export function Dashboard(){
    const[message,setMessage] = useState("");
    const[loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");

        if(!token){
            navigate("/login");
            return;
        }

        fetch("http://localhost:5000/protected",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((res)=> res.json())
            .then((data)=>{
                if (data.message) setMessage(data.message)
                else{
                    alert("Unauthorized login");
                    navigate("/login");
                }
                setLoading(false); 
            });
    }, [navigate]);

    if(loading){
        return <p>Please Wait</p>;
    }


    return(
        <div>
            <h1>Welcome User, You have Logined Successfully</h1>
            <br/>
            <p>{message}</p>
        </div>
        
    );
}