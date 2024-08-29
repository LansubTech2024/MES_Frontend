import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AxiosService from "../Components/AuthService/AuthService";
import "./Signup.css";
import Logo from "../../public/logo3.png";

const Validate = Yup.object().shape({
  name: Yup.string()
    .min(6, "Must be atleast 6 characters")
    .max(30, "Must be less than 30 characters")
    .required("Required"),
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

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //ShowPassword function
  const PasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  //handle sign up
  const handleSignup = async (data) => {
    setLoading(true);
    try {
      let res = await AxiosService.post("signup/", data);
      if (res.status === 201) {
        toast.success("Account created successfully", {
          position: "top-center",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account.Please try again", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
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
            <p>Enhancing Operational Productivity</p>
          </div>
        </div>
        <div className="signup-form">
          <div className="signup-heading">
            <h2>Create Account</h2>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={Validate}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values);
              resetForm({ values: "" });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label className="label-style" htmlFor="name">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Eg: John"
                    className="form-control"
                  />
                  {errors.name && touched.name && (
                    <p style={{ color: "red" }}>{errors.name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="label-style" htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Eg: johnsmith@abc.com"
                    className="form-control"
                  />
                  {errors.email && touched.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>
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
                <button
                  type="submit"
                  className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4 d-flex justify-content-center"
                >
                  {loading ? (
                    <span className="spinner-border text-warning"></span>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <p style={{ fontSize: "18px", textAlign:"center" }} className="acc-text">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    style={{ fontSize: "20px", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
