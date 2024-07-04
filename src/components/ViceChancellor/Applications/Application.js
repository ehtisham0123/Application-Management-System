import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../Spinner.png";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function Application() {
  let navigate = useNavigate();
  const token = reactLocalStorage.get("token");
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [rejectOpen, setRejectOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [fATeachers, setFATeachers] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [remark, setRemark] = useState('');


  let { id } = useParams();
  const [formdata, setFormData] = useState({
    teacher: "",
    application_id: id,
  });

  const [error, setError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const teacher_role = reactLocalStorage.get("teacher_role");
  const user_id = reactLocalStorage.get("user_id");

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
        .get(`http://localhost:5000/vice-chancellor/applications/show/${id}`, {
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

  const approveApplication = async (id) => {
    await axios
      .put(
        `http://localhost:5000/vice-chancellor/applications/approve/`,
        { id: id },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        setSuccess(res.data.success);
      });
  };

  const rejectApplication = async (id) => {
    await axios
      .put(
        `http://localhost:5000/vice-chancellor/applications/reject/`,
        { id: id },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        setSuccess(res.data.success);
      });
  };


  const handleSubmit1 = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    await axios
      .post(
        "http://localhost:5000/vice-chancellor/remarks/create",
        { "remark": remark, "application_id": id },
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
            setRemark("");
          } else if (response.data.error) {
            setError(response.data.error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const deleteRemark = async (id) => {
    await axios
      .delete(`http://localhost:5000/vice-chancellor/remarks/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        const newRemarks = remarks.filter((remark) => remark.id !== id);
        setRemarks(newRemarks);
      });
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
      renderCell: (params) => <Avatar src={"/uploads/" + params.row.avatar} />, // renderCell will render the component
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
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "address", headerName: "Address", width: 280 },
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
            <span className="text-uppercase text-muted  m-0 p-0 mr-2">
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
        )}

        {remarks.map((remark) => (
          <div className="row my-4">
            <div className="col-12 col-md-3">
              {remark.vice_chancellor && (
                <>
                  <h6 className="text-uppercase text-muted  m-0 p-0">
                    Remarks By Vice Chanceller
                  </h6>
                  <p className="text-primary">
                    {remark.vice_chancellor.firstname} {remark.vice_chancellor.lastname}
                  </p>
                </>
              )}
              {remark.teacher &&
                <>
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
                </>
              }
            </div>
            <div className="col-12 col-md-9">
              <h6 className="m-0 p-0">{remark.details}
                {remark.vice_chancellor &&
                  <IconButton>
                    <DeleteIcon onClick={() => {
                      deleteRemark(remark.id);
                    }} />
                  </IconButton>
                }</h6>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit1} className="needs-validation">
            <div className="row mt-5">
              <h6 className="text-uppercase ml-3 p-0">Add Remark</h6>

              <div className="form-group col-md-12">
                <textarea
                  name="details"
                  className={`input form-control`}
                  id="details"
                  placeholder="Enter Your Remark"
                  onChange={(e) => setRemark(e.target.value)}
                  value={remark}
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="form-group col-md-12">
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
      <div className="row mt-4 d-flex justify-content-center">
        {(application.status === "Pending" || application.status === "Rejected") && (
          <div className="col-12 col-md-3 mb-3">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setOpen(true);
              }}
              fullWidth
            >
              Approve Application
            </Button>
          </div>
        )}
        {(application.status === "Pending" || application.status === "Accepted") && (
          <div className="col-12 col-md-3 mb-3">
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setRejectOpen(true);
              }}
              fullWidth
            >
              Reject Application
            </Button>
          </div>
        )}
        {application.file && (
          <div className="col-12 col-md-3 mb-3">
            <Link
              to={`${application.file}/${application.file_type}`}
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <Button variant="contained" fullWidth>
                View Attached Files
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Dialog
        open={rejectOpen}
        onClose={() => {
          setRejectOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Reject this Application?"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              setRejectOpen(false);
              rejectApplication(application.id);
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setRejectOpen(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Approve this Application?"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              approveApplication(application.id);
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Application;
