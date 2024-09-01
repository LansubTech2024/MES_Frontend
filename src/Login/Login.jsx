import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AxiosService from "../Components/AuthService/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Login.css";
import Logo from "../../public/logopng5.png";

const Validate = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be atleast 8 characters")
    .max(15, "Must be less than 15 characters")
    .required("Required")
    .matches(
      /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
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
            <img src={Logo} alt="logo"/>
            <span className="company-add-name">Private Limited</span>
            <span className="company-tag-line">Enhancing operational productivity</span>
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
                  <Field
                    type="email"
                    name="email"
                    placeholder="Eg: john@abc.com"
                    className="input"
                  />
                  {errors.email && touched.email && (
                    <p className="error-message" style={{ color: "red" }}>
                      {errors.email}
                    </p>
                  )}
                </div>
                <br />

                <div className="form-group">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className={`input ${
                      errors.password && touched.password ? "input-error" : ""
                    }`}
                  />
                  {errors.password && touched.password && (
                    <p className="error-message" style={{ color: "red" }}>
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="check-div">
                  <input
                    className="check-input"
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={PasswordVisible}
                  />
                  <label htmlFor="showPassword"> Show Password</label>
                  <Link to="/forgetpassword" className="forget">
                    Forget Password?
                  </Link>
                </div>
                <br />

                <button
                  type="submit"
                  className="col-12 btn btn-lg btn-block login-btn mt-4 mb-4 d-flex justify-content-center"
                >
                  {loading ? (
                    <span className="spinner-border text-warning"></span>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="signup">
                  <p>Don&apos;t have an account?</p>
                  <Link to="/signup" className="signup-link">
                    Signup
                  </Link>
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