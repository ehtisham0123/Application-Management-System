import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

function EditSuggestion() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [formdata, setFormData] = useState({
    name: "",
    details: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    details: "",
  });
  const [success, setSuccess] = useState("");
  let { id } = useParams();

  useEffect(() => {
    let getSuggestionData = async () => {
      await axios
        .get(`http://localhost:5000/student/suggestion/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            setFormData(response.data.suggestion);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSuggestionData();

    let getSessionData = async () => {
      await axios
        .get(`http://localhost:5000/student/sessions`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setSessions(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSessionData();
  }, []);

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
    e.preventDefault();
    if (errors.name == "" && errors.details == "") {
      await axios.put(`http://localhost:5000/student/suggestions/update`, formdata, {
        headers: {
          token: token,
        },
      }).then(
        (response) => {
          if (response.data.success) {
            setSuccess(response.data.success);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <div id="content" className="">
      <div className="">
        <h3>Edit Suggestion</h3>
      </div>
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
            <label for="details">Details</label>
            <textarea
              name="details"
              className={`input form-control ${errors.details ? "is-invalid" : ""}`}
              id="details"
              placeholder="Details"
              onChange={handleChange}
              value={formdata.details}
              rows="6"
            ></textarea>
            {errors.details && (
              <div className="invalid-feedback">{errors.details}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            {success && (
              <div class="alert alert-primary" role="alert">
                {success}
              </div>
            )}
          </div>
          <div className="form-group col-md-12">
            <button type="submit" className="input form-control btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditSuggestion;
