import { useState, useEffect } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import Typography from "@mui/material/Typography";

function CreateSuggestion() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);

  const [formdata, setFormData] = useState({
    name: "",
    details: "",
    isHidden: "", 
  });
  const [errors, setErrors] = useState({
    name: "",
    details: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      // checking suggestion name
      case "name":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Suggestion Name length must be atleast 3 characters",
          }));
        } else if (value.length > 100) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Suggestion Name must not exceed 100 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking suggestion details
      case "details":
        if (value.length < 8) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Suggestion Details length must be atleast 8 characters",
          }));
        } else if (value.length > 1000) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Suggestion Details must not exceed 1000 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    if (errors.name == "" && errors.details == "") {
      await axios
        .post("http://localhost:5000/student/suggestions/create", formdata, {
          headers: {
            token: token,
          },
        })
        .then(
          (response) => {
            if (response.data.success) {
              setSuccess(response.data.success);
              setFormData({
                name: "",
                details: "",
                isHidden: "", 
              });
            }
            else if (response.data.error) {
              setError(response.data.error);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  return (
    <>
      <Typography variant="h4" noWrap component="div" sx={{ mb: 2 }}>
        Add New Suggestion
      </Typography>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row">
          <div className="form-group col-md-12">
            <label for="name">Suggestion Name</label>
            <input
              type="text"
              name="name"
              className={`input form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Suggestion Name"
              onChange={handleChange}
              value={formdata.name}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group col-md-12">
            <label for="details">Suggestion Details</label>
            <textarea
              name="details"
              className={`input form-control ${errors.details ? "is-invalid" : ""}`}
              id="details"
              placeholder="Suggestion Details"
              onChange={handleChange}
              value={formdata.details}
              rows="6"
            ></textarea>
            {errors.details && (
              <div className="invalid-feedback">{errors.details}</div>
            )}
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="isHidden">Identity</label>
            <select
              name="isHidden"
              className={`input form-control ${errors.isHidden ? "is-invalid" : ""
                }`}
              id="isHidden"
              onChange={handleChange}
              value={formdata.isHidden}
              required
            >
              <option value="">Select an option</option>
              <option value="true">Identity Hide</option>
              <option value="false">Identity Show</option>
              {/* Add more options as needed */}
            </select>
            {errors.isHidden && (
              <div className="invalid-feedback">{errors.isHidden}</div>
            )}
          </div>
        </div>
        <div className="row">
          {success && (
            <div className="form-group col-md-12">
              <div class="alert alert-primary" role="alert">
                {success}
              </div>
            </div>
          )}
          {error && (
            <div className="form-group col-md-12">
              <div class="alert alert-warning" role="alert">
                {error}
              </div>
            </div>
          )}
          <div className="form-group col-md-12">
            <button type="submit" className="input form-control btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateSuggestion;
