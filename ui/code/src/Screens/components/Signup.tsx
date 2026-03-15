import React, { useContext, useEffect, useState } from "react";
import "../resources/index.css";
import { AuthContext } from "../store/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "./Logo";
import { getRoles } from "../utils/Utils.js";

function Signup() {
  const { signup, userDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data: { username: string; password: string; role: string }) => {
    try {
      const result = await signup(data.username, data.password, data.role);

      if (result?.status !== "success") {
        throw new Error(result?.error || "Unknown server error");
      }

      setSuccessMessage(result);
    } catch (error: any) {
      console.error(error);
      setSuccessMessage(error.response.data);
    }
  };

  useEffect(() => {
    const fetchRoles = async() => {
        const roles = await getRoles();
        setRoles(roles);
    }
    fetchRoles();
  }, []);

  if (userDetails?.username) return <Navigate to="/" replace />;

  const firstError = Object.values(errors)[0];

  return (
    <div className="login-container">
      <div className="login-card">

        <Logo transparent={true} width={250} />

        <div className="form-error">
          {firstError && <p>{firstError.message}</p>}
          
        {successMessage && (
            <p className={successMessage.status == "success" ? "success-message" : "error-message"}>
                {successMessage.message}
            </p>
        )}
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters"
                }
              })}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 16,
                  message: "Password must be at least 16 characters"
                },
                pattern: {
                  value: /[!@#$%^&*(),.?":{}|<>]/,
                  message: "Password must contain at least one special character"
                }
              })}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match"
              })}
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select
              className="role-select"
              {...register("role", {
                required: "Role is required"
              })}
            >
                <option value="">Select Role</option>
                {roles?.map((role) => (
                    <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

        </form>

        <p className="login-footer">
          Already have an account?{" "}
          <span
            className="signup-link"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;