import { React, useState} from 'react';
import './Login.css'

import backgroundimg1 from '../../assets/login1.png';
import backgroundimg2 from '../../assets/login2.png'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>

        <label>Email</label>
        <input type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="********" required value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Submit</button>

        <p className="register-link">
          Not registered? <span>Register</span>
        </p>

        {success && <p className="success-msg">Welcome back, you’re logged in!</p>}
        {error && <p className="error-msg">{error}</p>}

      </form>

        <img src={backgroundimg1} className='backgroundImg1' alt='background photo'/>
        <img src={backgroundimg2} className='backgroundImg2' alt='background photo'/>

    </div>
  )
}

export default Login;
