import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AxiosService from "../Components/AuthService/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Login.css";
import Logo from "../../public/logo3.png";

const Validate = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be atleast 8 characters")
    .max(15, "Must be less than 15 characters")
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Make it More Strong"
    ),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  const [config, setConfig] = useState({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      try {
        const user = JSON.parse(loggedInUserJson);
        if (user && user.userData && user.token) {
          setLoggedUser(user.userData);
          setToken(user.token);
          setConfig({
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          });
        } else {
          console.log("Stored user data is incomplete");
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("loggedInUser"); // Remove invalid data
      }
    }

    AxiosService.get("/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  //ShowPassword function
  const PasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (data) => {
    setLoading(true);
    try {
      let response = await AxiosService.post("signin/", data);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data.userData)
      );
      setLoggedUser(response.data.userData);
      setToken(response.data.token);
      setConfig({
        headers: {
          authorization: `bearer ${response.data.token}`,
        },
      });

      setLoading(false);

      navigate("/home");

      if (response.status === 201) {
        toast.success("login successful", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Incorrect email or password", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
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
            <p>Enhancing Operational Productivity</p>
          </div>
        </div>
        <div className="login-form">
          <div className="login-heading">
            <h2>Login</h2>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Validate}
            onSubmit={(values, { resetForm }) => {
              handleSignIn(values);
              resetForm({ values: "" });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label className="label-style" htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Eg: john@abc.com"
                    className="form-control"
                  />
                  {errors.email && touched.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>
                <br />

                <div className="form-group">
                  <label className="label-style" htmlFor="password">
                    Password
                  </label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className="form-control"
                  />
                  {errors.password && touched.password && (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  )}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={PasswordVisible}
                  />
                  <label htmlFor="showPassword"> Show Password</label>
                </div>
                <Link href="#" className="forget">
                  Forget Password?
                </Link>
                <br />
                
                <button
                  type="submit"
                  className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4 d-flex justify-content-center"
                >
                  {loading ? (
                    <span className="spinner-border text-warning"></span>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="signup">
                  <p>Don&apos;t have an account?</p>
                  <a href="/signup">Signup</a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
