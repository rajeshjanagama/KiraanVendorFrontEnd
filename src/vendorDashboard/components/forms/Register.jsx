import React,{useState} from 'react';
import {API_URL} from '../../data/apiPath';

const Register = ({showLoginHandler}) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API_URL}/vendor/registration`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, email,phoneNumber, password })
          });
    
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setUserName("");
            setEmail("");
            setPhoneNumber("");
            setPassword("");
            alert("Vendor registered successfully");
            showLoginHandler();
          }else{
            setError(data.error)
          }
        } catch (error) {
          console.error("Registration failed", error);
          alert("Registration failed");
        }
      };
    
    return (
        <div className="registerSection">

            <form className='authForm' onSubmit={handleSubmit}>

                <h3>Vendor Register</h3>
                <label>Username</label>
                <input type="text" name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter your name' /><br />
                <label>Email</label>
                <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br />
                <label>Phone-number</label>
                <input type="text" name='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Enter your phone number' /><br />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='Enter your password' /><br />

                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>

        </div>
    )
}

export default Register
