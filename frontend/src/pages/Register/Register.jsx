import './Register.css'
import { React, useState } from 'react';

import backgroundimg1 from '../../assets/login1.png';
import backgroundimg2 from '../../assets/login2.png'

function Register() {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="register-container">
      <form className="register-form">
        <h2>Register</h2>

        <label>Username</label>
        <input type="text" placeholder="Enter username" required value={username} onChange={(e) => setUsername(e.target.value)}/>

        {/* <label>Name</label>
        <input type="text" placeholder="Enter name" required value={name} onChange={(e) => setName(e.target.value)}/>

        <label>Surname</label>
        <input type="text" placeholder="Enter surname" required value={surname} onChange={(e) => setSurname(e.target.value)}/> */}

        <label>Email</label>
        <input type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="********" required value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Submit</button>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>

        {success && <p className="success-msg">You've successfully registered.</p>}
        {error && <p className="error-msg">{error}</p>}

      </form>

        <img src={backgroundimg1} className='backgroundImg1' alt='background photo'/>
        <img src={backgroundimg2} className='backgroundImg2' alt='background photo'/>

    </div>
  )
}

export default Register;
