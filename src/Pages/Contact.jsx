import React, { useState } from "react";
import Axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import navigate for routing
import "../Styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({}); // Add state for validation errors

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!formData.first_name.trim()) {
      errors.first_name = "First Name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone Number is required";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:5713/contact",
        formData
      );

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        navigate("/"); // Assuming you're using a routing library
      } else {
        // Handle errors
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="contact-container">
      <div>
        <div className="form">
          <h3 className="heading">Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="First Name"
                required
                onChange={handleChange}
              />
              {validationErrors.first_name && (
                <p className="error">{validationErrors.first_name}</p>
              )}
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
              {validationErrors.last_name && (
                <p className="error">{validationErrors.last_name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              {validationErrors.email && (
                <p className="error">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone_number">Phone number</label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="Phone number"
                onChange={handleChange}
                required
              />
              {validationErrors.phone_number && (
                <p className="error">{validationErrors.phone_number}</p>
              )}
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Leave us a message"
                onChange={handleChange}
                cols={3}
              />
              {validationErrors.message && (
                <p className="error">{validationErrors.message}</p>
              )}
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <img
        alt="Contact us"
        src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=800&q=80"
      />
    </div>
  );
};

export default Contact;
