import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function Details(){
    const navigate = useNavigate();

    const[formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    });

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        alert("Form submitted!");

        const response = await fetch("http://localhost:5000/submit", {
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log(result.message)

        navigate("/login");
    }

    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Registration Form</h2>
                <input type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
                <br/>
                <input type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange}/>
                <br/>
                <input type="password" placeholder="Enter Passowrd" name="password" value={formData.password} onChange={handleChange}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>          
        </div>
    );
}