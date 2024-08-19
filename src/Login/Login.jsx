import { useState } from "react";
import axios from "axios";
import "./Login.css";
import Logo from "../../public/logo3.png";

const Login = () => {
  const [formData, setFormData] = useState({
    
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
      const response = await axios.post('/api/login/', { formData });
      console.log(response.data.message);
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error('login failed:', error.response.data);
      // Handle signup error (e.g., show error message)
    }
  };
  return (
    <div className="login-container">
      <div className="login-part">
        <div className="login-background">
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
        <div className="login-form">
            <div className="login-heading">
                <h2>Login</h2>
            </div>
        <form onSubmit={handleSubmit}>
        <div className="user-box">
             <label>Email</label><br/>
              <input type="email" name="email" id="email" placeholder="Eg:johndoe@gmail.com" className="email" onChange={handleChange} required/><br/>
              </div>
              <div className="user-box">
              <label>Password</label><br/>
              <input type="password" name="password" id="password" placeholder="........" className="password" onChange={handleChange} required/><br/>
              </div>
        
        <a href="#" className="forget">Forget Password?</a><br/>
        <a href="/visulization"><button type="submit">Login</button></a>
        <div className="signup">
          <p>Don&apos;t have an account?</p>
          <a href="/signup">Signup</a>
        </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
