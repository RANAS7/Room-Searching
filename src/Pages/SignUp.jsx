import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../Styles/SignUp.css";

const SignUp = () => {
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    contact_number: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Update the handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const { data } = await Axios.post(
          "http://localhost:5713/signUp",
          values
        );
        localStorage.setItem("userData", JSON.stringify(data.user));
        // console.log(data);
        navigate("/");
      } catch (error) {
        // alert(error.message);
      }
    }
  };

  const validateForm = (formValues) => {
    const errors = {};

    // Validate full_name
    if (!formValues.full_name.trim()) {
      errors.full_name = "Name is required";
    }

    if (!formValues.address.trim()) {
      errors.address = "Name is required";
    }

    // Validate email
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formValues.email)) {
      errors.email = "Invalid email format";
    }

    // Validate contact_number
    if (!formValues.contact_number.trim()) {
      errors.contact_number = "Contact Number is required";
    } else if (!isValidPhoneNumber(formValues.contact_number)) {
      errors.contact_number = "Invalid contact number format";
    }

    // Validate password
    if (!formValues.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Implement email validation logic here
    return true; // You can use a library like 'validator' for more robust validation
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Implement phone number validation logic here
    return true; // You can use a library like 'validator' for more robust validation
  };

  return (
    <div className="all">
      <form onSubmit={handleSubmit}>
        <div>Sign-Up</div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="full_name"
            placeholder="Name"
            autoComplete="off"
            onChange={handleChange}
            value={values.full_name}
          />
          {errors.full_name && (
            <span className="text-danger">{errors.full_name}</span>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            autoComplete="off"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            autoComplete="off"
            onChange={handleChange}
            value={values.contact_number}
          />
          {errors.contact_number && (
            <span className="text-danger">{errors.contact_number}</span>
          )}
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            autoComplete="off"
            onChange={handleChange}
            value={values.address}
          />
          {errors.address && (
            <span className="text-danger">{errors.address}</span>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>
        <button type="submit">Sign Up</button>
        <p>If you already have an account</p>
        <NavLink to="/login">Log In</NavLink>
      </form>
    </div>
  );
};

export default SignUp;
