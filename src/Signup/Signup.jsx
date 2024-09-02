import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AxiosService from "../Components/AuthService/AuthService";
import "./Signup.css";
import Logo from "../../public/lansub.png";

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
        navigate("/");
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
      <div className="signup-background">
          <img src={Logo} alt="Company Logo" width={700} height={200} className="logo-image" />
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
              <Form className="form">
                <div className="form-div">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Eg: John"
                    className="input"
                  />
                  {errors.name && touched.name && (
                    <p style={{ color: "red" }}>{errors.name}</p>
                  )}
                </div>
                <div className="form-div">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Eg: johnsmith@abc.com"
                    className="input"
                  />
                  {errors.email && touched.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>
                <div className="form-div">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className="input"
                  />
                  {errors.password && touched.password && (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  )}
                </div>
                <div className="checkbox-container">
                  <input
                    className="checkbox"
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
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
