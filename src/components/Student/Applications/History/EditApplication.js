import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import { Link, useParams } from "react-router-dom";

import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';




function EditApplication() {

    let { category,purpose } = useParams();

    let subject;
    if (category == 'other-purpose') {
      subject = '';
    }else{
      subject = 'Application For ' +category;
    }
  
    const [formdata, setFormData] = useState({
    name: "",
    rollnumber: "",
    classandsection: "",
    discipline: "",
    mobilenumber: "",
    subject: subject,
    purpose:purpose,
    details: "",
    category:category,
    date: "",
    file: "",
    file_type: "", 
  });


  
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);


const [success, setSuccess] = useState("");
const [error, setError] = useState("");

let { id } = useParams();
 
  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/student/applications/show/${id}`, {
          headers: {
            token: token,
          }
        })
        .then((response) => {
          if (response.data) {
            setFormData(response.data.result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [success]);


    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handlePhoto = (e) => {
    setFormData({ ...formdata, file: e.target.files[0] });
  };

    const handleSubmit = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();

      const fd = new FormData();

      fd.append("id",formdata.id);
      fd.append("name",formdata.name);
      fd.append("rollnumber",formdata.rollnumber);
      fd.append("classandsection",formdata.classandsection);
      fd.append("discipline",formdata.discipline);
      fd.append("mobilenumber",formdata.mobilenumber);
      fd.append("subject",formdata.subject);
      fd.append("purpose",formdata.purpose);
      fd.append("details",formdata.details);
      fd.append("category",formdata.category);
      fd.append("date",formdata.date);
      fd.append("file", formdata.file);
      fd.append("file_type", formdata.file_type);

      await axios
        .put("http://localhost:5000/student/applications/update", fd, {
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

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" noWrap component="div">
          Edit Your Application   
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} className="border p-5">
        <div className="row">
          <div className="form-group col-md-4">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control input`}
              id="name"
              placeholder="Enter Name"
              onChange={handleChange}
              value={formdata.name}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label for="rollnumber">Roll Number</label>
            <input
              type="text"
              name="rollnumber"
              className={`form-control input`}
              id="rollnumber"
              placeholder="Enter Roll Number"
              onChange={handleChange}
              value={formdata.rollnumber}
              required
            />
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
              className={`form-control input`}
              id="mobilenumber"
              placeholder="Enter Mobile Number"
              onChange={handleChange}
              value={formdata.mobilenumber}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label for="subject">Subject</label>
            <input
              type="text"
              name="subject"
              className={`form-control input`}
              id="subject"
              placeholder="Enter Subject"
              onChange={handleChange}
              value={formdata.subject}
              required
            />
          </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label for="details">Details</label>
              <textarea
                name="details"
                className={`input form-control`}
                id="details"
                placeholder="Enter Application Details"
                onChange={handleChange}
                value={formdata.details}
                rows="7"
                required
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6 mt-1">
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
            <div className="form-group col-md-6">
              <label for="marks">Date</label>
              <input
                name="date"
                className={`form-control input`}
                type="datetime-local"
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

export default EditApplication;
