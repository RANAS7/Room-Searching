import React, { useState, useRef } from "react";
import { TextField, MenuItem } from "@mui/material";
import Axios from "axios"; // Import Axios for making HTTP requests
import "../Styles/AddRoom.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Authentication";

const AddRoom = () => {
  const { isAuthenticated } = useAuth();

  const hiddenFileInput = useRef(null);
  const [images, setImages] = useState(null);

  const [values, setValues] = useState({
    title: "",
    description: "",
    contact: "",
    category: "Room", // Default category
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const categories = [
    {
      value: "Room",
      label: "Room",
    },
    {
      value: "Apartment",
      label: "Apartment",
    },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setImages(file);
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!values.title.trim()) {
      validationErrors.title = "Title is required";
    }

    if (!images) {
      validationErrors.image = "Image is required";
    }

    if (!values.description.trim()) {
      validationErrors.description = "Description is required";
    }

    if (!values.category.trim()) {
      validationErrors.category = "Category is required";
    }

    if (!values.contact.trim()) {
      validationErrors.contact = "Contact is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can submit it here
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("image", images);
        formData.append("contact", values.contact);
        formData.append("description", values.description);
        formData.append("category", values.category);

        const { data } = await Axios.post(
          "http://localhost:5713/addRoom",
          formData
        );
        console.log("Form Data:", formData);
        navigate("/");
        localStorage.setItem("userData", JSON.stringify(data.user));
        alert("Room is posted successfully");
      } catch (error) {
        console.error("Error posting room:", error);
      }
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="addRoom">
              <TextField
                label="Title"
                name="title"
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </div>
            <div className="box-decoration">
              <label
                htmlFor="image-upload-input"
                className="image-upload-label"
              >
                {/* {images ? images.name : 'Choose an image'} */}
              </label>
              <div onClick={handleClick} style={{ cursor: "pointer" }}>
                {images ? (
                  <img
                    src={URL.createObjectURL(images)}
                    alt="upload image"
                    className="img-display-after"
                  />
                ) : (
                  <img
                    src="./../upload.png"
                    alt="upload image"
                    className="img-display-before"
                  />
                )}

                <input
                  id="image-upload-input"
                  type="file"
                  name="image"
                  onChange={handleChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </div>
              {errors.image && <span className="error">{errors.image}</span>}
            </div>
            <div>
              <TextField
                label="Owners Contact"
                name="contact"
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.contact && (
                <span className="error">{errors.contact}</span>
              )}
            </div>
            <div>
              <TextField
                label="Description"
                name="description"
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>
            <div>
              <TextField
                id="outlined-select-category"
                select
                label="Category"
                name="category"
                value={values.category}
                onChange={handleChange}
                helperText="Please select your category"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {errors.category && (
                <span className="error">{errors.category}</span>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <p>
          <br />
          <br />
          <br />
          Please you should login first <br />
          <NavLink to="/login">Login</NavLink>
        </p>
      )}
    </>
  );
};

export default AddRoom;
