import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import { Link, useParams } from "react-router-dom";

import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

let illegalUserName = /[^A-Za-z\s]/;
let validNumbers = /^\d+$/;

function NewApplication() {
  let { category, purpose } = useParams();

  let subject;
  if (category == "other-purpose") {
    subject = "";
  } else {
    subject = "Application For " + category;
  }

  const [formdata, setFormData] = useState({
    name: "",
    rollnumber: "",
    firstname: "",
    lastname: "",
    classandsection: "",
    discipline: "",
    application_type: "",
    contact: "",
    mobilenumber: "",
    subject: subject,
    purpose: purpose,
    details: "",
    category: category,
    subCategory: "",
    date: "",
    file: "",
  });


  const [errors, setErrors] = useState({
    name: "",
    rollnumber: "",
    classandsection: "",
    discipline: "",
    application_type: "",
    subject: "",
    purpose: "",
    mobilenumber: "",
    details: "",
    category: "",
    subCategory: "",
    contact: "",
    address: "",
    gender: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/student/profile/`, {
          headers: {
            token: token,
          }
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            setFormData(prevFormData => ({ ...prevFormData, ...response.data.result }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [success]);


  const token = reactLocalStorage.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      // checking name
      case "name":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Name length must be atleast 3 characters",
          }));
        } else if (value.length > 18) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Name must not exceed 18 characters",
          }));
        } else if (illegalUserName.test(value)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "The Name contains illegal characters.",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;


      // Roll Numbers
      case "rollnumber":
        if (!value.match(validNumbers)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Roll Number",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;

      // checking mobilenumber
      case "mobilenumber":
        if (value.length === 11) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Mobile Number",
          }));
        }
        break;

      // checking details
      case "details":
        if (value.length > 20 && value.length < 500) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]:
              "Details length must be atleast 20 characters and must not exceed 500 characters",
          }));
        }
        break;
      default:
        break;
    }

  };

  const handlePhoto = (e) => {
    setFormData({ ...formdata, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    if (
      errors.name === "" &&
      errors.rollnumber === "" &&
      errors.classandsection === "" &&
      errors.discipline === "" &&
      errors.application_type === "" &&
      errors.subject === "" &&
      errors.purpose === "" &&
      errors.mobilenumber === "" &&
      errors.details === ""
    ) {

      const fd = new FormData();

      fd.append("name", formdata.firstname + ' ' + formdata.lastname);
      fd.append("rollnumber", formdata.rollnumber);
      fd.append("classandsection", formdata.classandsection);
      fd.append("discipline", formdata.discipline);
      fd.append("mobilenumber", formdata.contact);
      fd.append("subject", formdata.subject);
      fd.append("purpose", formdata.purpose);
      fd.append("details", formdata.details);
      fd.append("application_type", formdata.application_type);
      fd.append("category", formdata.category);
      fd.append("subCategory", formdata.subCategory);
      fd.append("date", formdata.date);
      fd.append("file", formdata.file);

      console.log(fd)

      await axios
        .post("http://localhost:5000/student/applications/create", fd, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          (response) => {
            if (response.data.success) {
              setSuccess(response.data.success);
            } else if (response.data.error) {
              setError(response.data.error);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" noWrap component="div">
          Submit New Application
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} className="border p-5">
        <div className="row">
          <div className="form-group col-md-4">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control input ${errors.name ? "is-invalid" : ""
                }`}
              id="name"
              placeholder="Enter Name"
              onChange={handleChange}
              value={formdata.firstname + ' ' + formdata.lastname}
              disabled
              required
            />

            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group col-md-4">
            <label for="rollnumber">Roll Number</label>
            <input
              type="text"
              name="rollnumber"
              className={`form-control ${errors.rollnumber ? "is-invalid" : ""
                }`}
              id="rollnumber"
              placeholder="Enter Roll Number"
              onChange={handleChange}
              value={formdata.rollnumber}
              disabled
              required
            />
            {errors.rollnumber && (
              <div className="invalid-feedback">{errors.rollnumber}</div>
            )}
          </div>
          <div className="form-group col-md-4">
            <label for="name">Discipline</label>
            <input
              type="text"
              name="discipline"
              className={`form-control input`}
              id="discipline"
              placeholder="Enter Discipline"
              onChange={handleChange}
              value={formdata.discipline}
              disabled
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label for="classandsection">Class And Section</label>
            <input
              type="text"
              name="classandsection"
              className={`form-control input`}
              id="classandsection"
              placeholder="Enter Class And Section"
              onChange={handleChange}
              value={formdata.classandsection}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label for="name">Mobile Number</label>
            <input
              type="text"
              name="mobilenumber"
              className={`form-control ${errors.mobilenumber ? "is-invalid" : ""}`}
              id="mobilenumber"
              placeholder="Enter Mobile Number"
              onChange={handleChange}
              value={formdata.contact}
              disabled
              required
            />
            {errors.mobilenumber && (
              <div className="invalid-feedback">{errors.mobilenumber}</div>
            )}
          </div>
        </div>
  <div className="row">
          <div className="form-group col-md-6">
            <label for="subject">Subject</label>
            <input
              type="text"
              name="subject"
              className={`form-control input`}
              id="subject"
              placeholder="Enter Subject"
              onChange={handleChange}
              disabled={category != "other-purpose"}
              value={formdata.subject}
              required
            />
          </div>
          {(category === 'leave' || category === 'result' || category === 'complaint' || category ===  'instructor change') && (
            <div className="form-group col-md-6">
              <label htmlFor="subCategory">Sub Category</label>
              <select
                id="subCategory"
                name="subCategory"
                className="form-control input"
                value={formdata.subCategory}
                onChange={handleChange}
                required
              >
                <option value="">Select Sub Category</option>
                {category === 'leave' && (
                  <>
                    <option value="One Day Leave">One Day Leave</option>
                    <option value="Two Day Leave">Two Day Leave</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Short Leave">Short Leave</option>
                  </>
                )}
                {category === 'result' && (
                  <>
                    <option value="Theory Course">Theory Course</option>
                    <option value="Lab Course">Lab Course</option>
                  </>
                )}
                {category === 'complaint' && (
                  <>
                    <option value="Complaint Regarding Instructor">Complaint Regarding Instructor</option>
                    <option value="Complaint Regarding Student">Complaint Regarding Student</option>
                    <option value="Complaint Regarding Admin Staff">Complaint Regarding Admin Staff</option>
                  </>
                )}
                 {category === 'instructor change' && (
                  <>
                    <option value="Theory Instructor">Theory Instructor</option>
                    <option value="Lab Instructor">Lab Instructor</option>
                  </>
                )}
              </select>
            </div>
          )}
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <label for="details">Details</label>
            <textarea
              name="details"
              className={`form-control ${errors.details ? "is-invalid" : ""}`}
              id="details"
              placeholder="Enter Application Details"
              onChange={handleChange}
              value={formdata.details}
              rows="7"
              required
            ></textarea>
            {errors.details && (
              <div className="invalid-feedback">{errors.details}</div>
            )}
          </div>
        </div>
      
        <div className="row">
          <div className="form-group col-md-4 mt-1">
            <label for="file"> Attach File </label>
            <br />
            <input
              id="file"
              type="file"
              name="file"
              className="form-control-file input"
              onChange={handlePhoto}
            />
          </div>
          <div className="form-group col-md-4">
            <label for="application_type">Application Type</label>
            <select
              id="application_type"
              name="application_type"
              className="form-control input"
              value={formdata.application_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Application Type</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">
                Urgent
              </option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label for="marks">Date</label>
            <input
              name="date"
              className={`form-control input`}
              type="date"
              id="date"
              placeholder="Enter Date"
              onChange={handleChange}
              value={formdata.date}
              required
            />
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
          <div className="form-group col-md-12 mt-1">
            <button type="submit" className="form-control input btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewApplication;