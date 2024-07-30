import "./Login.css";
import Logo from "../../public/logo3.png";

const Login = () => {
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
            <form>
              <div className="user-box">
                <label>Email</label><br/>
                <input type="email" name="email" id="email" placeholder="Eg:johndoe@gmail.com" className="email" required/><br/>
                </div>
                <div className="user-box">
                <label>Password</label><br/>
                <input type="password" name="password" id="password" placeholder="........" className="password" required/><br/>
                </div>
                <a href="#" className="forget">Forget Password?</a><br/>
                <button type="submit">Login</button>
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
