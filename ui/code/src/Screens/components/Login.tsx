import React, { useContext } from "react";
import "../resources/index.css";
import { AuthContext } from "../store/AuthContext";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "./Logo";

function Login() {
    const {login, userDetails, setUserDetails} = useContext(AuthContext);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm();
    const onSubmit = async(data) => {
        try {
            const result = await login(data.username, data.password);

            if (result?.status !== "success") {
                throw new Error(result?.error || "Unknown server error");
            }

            setUserDetails(result.user);

            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error(error);
        }
    };

    if (userDetails?.username) return <Navigate to= "/" replace />
  return (
    <div className="login-container">
      <div className="login-card">
        <Logo transparent={true} width={250}></Logo>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            {errors.username && (
              <p className="error" style={{color: "red"}}>{errors.username.message}</p>
            )}
            {!errors.username && errors.password && (
              <p className="error" style={{color: "red"}}>{errors.password.message}</p>
            )}

            <label>Username</label>
            <input type="text" placeholder="Enter your username" 
            {...register("username", {required: "Username is required", minLength: {value: 5, message: "Username must at least 5 characters"}})} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" 
            {...register("password", {required: "Password is required", minLength: {value: 16, message: "Password must at least 16 characters"},
                pattern: {
                value: /[!@#$%^&*(),.?":{}|<>]/,
                message: "Password must contain at least one special character"
            }})} />
            
          </div>

          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? "Loggin in..." : "Login"}
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <span className="signup-link" onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;