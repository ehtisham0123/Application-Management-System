import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../../Spinner.png";
import moment from "moment";

import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";


function Application() {
  let navigate = useNavigate();
  const token = reactLocalStorage.get("token");
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [remarks, setRemarks] = useState([]);
  const [fATeachers, setFATeachers] = useState([]);
  const [pageSize, setPageSize] = useState(5);


  let { id } = useParams();
  const [formdata, setFormData] = useState({
    teacher: "",
    application_id: id,
  });

  const [error, setError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [success, setSuccess] = useState("");
  const [teachers, setTeachers] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/admin/teachers/`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setTeachers(response.data.result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      await axios
        .get(`http://localhost:5000/student/applications/show/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setApplication(response.data.result);
            setRemarks(response.data.remarks);
            setFATeachers(response.data.teachers);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [success]);


  const handleSubmit = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    await axios
      .post(
        "http://localhost:5000/teacher/forwarded_applications/create",
        formdata,
        {
          headers: {
            token: token,
          },
        }
      )
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

  function getFullName(params) {
    return `${params.row.firstname || ''} ${params.row.lastname || ''}`;
  }

  const columns = [
    {
      field: "image",
      headerName: "Photo",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => <Avatar src={"/uploads/" + params.row.avatar} />,
    },
    { field: "name", headerName: "User Name", width: 150, hide: true },
    {
      field: 'fullname',
      headerName: 'Full name',
      width: 160,
      valueGetter: getFullName,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", width: 120, hide: true },
    { field: "gender", headerName: "Gender", width: 120, hide: true },
    { field: "address", headerName: "Address", width: 280 },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 180,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/student/teachers/teacher-profile/${params.id}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                size="small"
                startIcon={<VisibilityOutlinedIcon />}
                color="primary"
              >
                View
              </Button>
            </Link>
          </>
        );
      },
    },
  ];


  return loading ? (
    <div className="loading">
      <img src={Spinner} className="loader" alt="loader" />
      <h2>Loading</h2>
    </div>
  ) : (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" noWrap component="div">
          Application Details
        </Typography>
      </Box>
      <div className="row border p-3">
        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">Name</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">{application.name}</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">Roll Number</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">{application.rollnumber}</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">
            Class And Section
          </h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">{application.classandsection}</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">Discipline</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">{application.discipline}</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">Mobile Number</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">{application.mobilenumber}</h6>
        </div>

        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">Subject</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">{application.subject}</h6>
        </div>

        <div className="col-12 my-3">
          <h6 className="m-0 p-0">
            <span className="text-uppercase text-muted  m-0 mr-2 p-0">
              Details :
            </span>
            {application.details}
          </h6>
        </div>

        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">Date</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">
            {moment(application.created_at)
              .utc()
              .format("dddd, MMMM Do YYYY, h:mm a")}
          </h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">Status</h6>
        </div>

        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">

            {application.status == "Accepted" && (
              <p className="badge badge-success px-3 py-1 mt-3">Accepted</p>
            )}
            {application.status == "Rejected" && (
              <p className="badge badge-danger px-3 py-1 mt-3">Rejected</p>
            )}
            {application.status == "Pending" && (
              <p className="badge badge-primary px-3 py-1 mt-3">Pending</p>
            )}

          </h6>
        </div>
        {application.status != "Pending" && (
          <>
            <div className="col-12 col-md-3">
              <h6 className="text-uppercase text-muted  m-0 p-0">{application.status} By</h6>
            </div>
            <div className="col-12 col-md-3">
              <h6 className="m-0 p-0">
                <h5 className="text-danger">{application.approved_or_rejected_by}</h5>
              </h6>
            </div>
          </>
        )}
        <div className="col-12 col-md-3">
          <h6 className="text-uppercase text-muted  m-0 p-0">Application Type</h6>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="m-0 p-0">
            <h6 className="m-0 p-0">{application.application_type}</h6>
          </h6>
        </div>
        {application.subCategory && (
          <>
            <div className="col-12 col-md-3">
              <h6 className="text-uppercase text-muted  m-0 p-0">Sub Category</h6>
            </div>
            <div className="col-12 col-md-3">
              <h6 className="m-0 p-0">
                <h6 className="m-0 p-0">{application.subCategory}</h6>
              </h6>
            </div>
          </>
        )}

        {fATeachers[0] && (
          <>
            <Box sx={{ my: 2 }}>
              <Typography variant="h6" noWrap component="div" className="text-uppercase text-muted ">
                <h6 className="text-uppercase text-muted  m-0 p-0"> Applications Forwarded to Following Teachers</h6>
              </Typography>
            </Box>
            <DataGrid
              style={{ height: 250, width: "100%" }}
              rows={fATeachers}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              loading={loading}
            />
          </>
        )
        }
        {remarks.map((remark) => (
          <div className="row my-4">
            <div className="col-12 col-md-3">
              {remark.teacher.role === "Chairman" && (
                <>
                  <h6 className="text-uppercase text-muted  m-0 p-0">
                    Remarks By Chairman
                  </h6>
                  <p className="text-primary">
                    {remark.teacher.firstname} {remark.teacher.lastname}
                  </p>
                </>
              )}

              {remark.teacher.role === "Coordinator Software Engineering" && (
                <>
                  <h6 className="text-uppercase text-muted  m-0 p-0">
                    Remarks By Coordinator Software Engineering
                  </h6>
                  <p className="text-primary">
                    {remark.teacher.firstname} {remark.teacher.lastname}
                  </p>
                </>
              )}

              {remark.teacher.role === "Coordinator Computer Science" && (
                <>
                  <h6 className="text-uppercase text-muted  m-0 p-0">
                    Remarks By Coordinator Computer Science
                  </h6>
                  <p className="text-primary">
                    {remark.teacher.firstname} {remark.teacher.lastname}
                  </p>
                </>
              )}

              {remark.teacher.role === "Coordinator M. Phil." && (
                <>
                  <h6 className="text-uppercase text-muted  m-0 p-0">
                    Remarks By Coordinator M. Phil.
                  </h6>
                  <p className="text-primary">
                    {remark.teacher.firstname} {remark.teacher.lastname}
                  </p>
                </>
              )}

              {remark.teacher.role === "Lecturer" && (
                <>
                  <h6 className="text-uppercase text-muted  m-0 p-0">
                    Remarks By Teacher
                  </h6>
                  <p className="text-primary">
                    {remark.teacher.firstname} {remark.teacher.lastname}
                  </p>
                </>
              )}
            </div>
            <div className="col-12 col-md-9">
              <h6 className="m-0 p-0">{remark.details}</h6>
            </div>
          </div>
        ))}
      </div>


      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="row mt-5">
              <h6 className="text-uppercase ml-3 p-0">Forword Application</h6>
              <div className="form-group col-md-10">
                <select
                  id="teacher"
                  name="teacher"
                  className="form-control"
                  value={formdata.teacher}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option className="" value={teacher.id}>
                      {" "}
                      Name : {teacher.firstname} {teacher.lastname}{" "}
                      ____________ Email : {teacher.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-2">
                <button
                  type="submit"
                  className="input form-control btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="row">
              {formSuccess && (
                <div className="form-group col-md-12">
                  <div class="alert alert-primary" role="alert">
                    {formSuccess}
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
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        {application.file && (
          <div className=" d-flex">
            <Link
              to={`${application.file}/${application.file_type}`}
              className="w-100 mt-2"
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <Button
                variant="contained"
                className="w-100"
                sx={{ mr: 1 }}
                startIcon={<VisibilityOutlinedIcon />}
              >
                View Attached Files
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Application;
