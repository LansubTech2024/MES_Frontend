import { useState } from 'react';
import axios from 'axios';
import './Signup.css'
import Logo from "../../public/logo3.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup/', { formData });
      console.log(response.data.message);
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error('Signup failed:', error.response.data);
      // Handle signup error (e.g., show error message)
    }
  };
  return (
    <div className="signup-container">
    <div className="signup-part">
      <div className="signup-background">
        <div className="logo">
          <img src={Logo} alt="logo" width={40} height={60} />
        </div>
        <div className="company-name">
          <h3>Lansub Technologies</h3>
        </div>
        <div className="company-des">
          <p>
            Enhancing Operational Productivity
          </p>
        </div>
      </div>
      <div className="signup-form">
          <div className="signup-heading">
              <h2>Create Account</h2>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="user-box">
              <label>Name</label><br/>
              <input type="text" name="name" id="name" placeholder="Eg:John" className="name" onChange={handleChange} required/><br/>
              </div>
            <div className="user-box">
              <label>Email</label><br/>
              <input type="email" name="email" id="email" placeholder="Eg:johndoe@gmail.com" className="email" onChange={handleChange} required/><br/>
              </div>
              <div className="user-box">
              <label>Password</label><br/>
              <input type="password" name="password" id="password" placeholder="........" className="password" onChange={handleChange} required/><br/>
              </div>
              <button type="submit">Signup</button>
              <div className="login">
                <p>Already have an account?</p>
                <a href="/login">Login</a>
              </div>
          </form>
      </div>
    </div>
  </div>
  )
}

export default Signup;
