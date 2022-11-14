import logo from '../../images/logo.png'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './login.css'

const Login = ()=>{
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [allEntry, setAllentry] = useState([])

  const login = (e) =>{
      e.preventDefault()
      const newEntry = {email: email, password:password}
      setAllentry([...allEntry, newEntry])
      console.log(allEntry)
  }
  return (
    <div className="login">
      <img className='logo' src={logo} />
      <div className='area'>
        <p className='loginmsg'>CONTINUE YOUR JOURNEY</p>
        <h1 className='logintitle'>Sign In</h1>
        <form action='' onSubmit={login}>
          <label>
            <input name='email' id='email' type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='logininput1'/>
          </label>
          <label>
            <input name='password' id='password' type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='logininput2'/>
          </label>
        </form>
        <button className='loginbuttons' type='submit'>Sign In</button>
        <p className='loginbottom1'>Forgot Your Password? Reset Here</p>
        <p className='loginbottom2'>Don't have an account? Sign Up</p>
      </div>
    </div>
  );
}

export default Login;