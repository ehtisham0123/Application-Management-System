import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Applications() {
  const token = reactLocalStorage.get("token");
  const teacher_role = reactLocalStorage.get("teacher_role");
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [applicationId, setApplicationId] = useState();
  const [open, setOpen] = useState(false);
  const [reloading, setReloading] = useState(false);


  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(
          `http://localhost:5000/teacher/applications`,
          {
            headers: {
              token: token,
            },
            params: {
              teacher_role: teacher_role,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            setApplications(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsersData();
  }, []);


  const setNewApplications = async (e) => {
    if (e.target.value == "All") {
      setReloading(!reloading);
    } else {
      let application_type = e.target.value;
      setLoading(true);
      await axios
        .get(`http://localhost:5000/teacher/applications/search-applications`, {
          headers: {
            token: token,
          },
          params: {
            application_type: application_type,
            teacher_role: teacher_role,
          },
        })
        .then((response) => {
          if (response.data) {
            setApplications(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } 


    const deleteApplication = async (id) => {
    await axios
      .delete(`http://localhost:5000/teacher/applications/`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        const newApplications = applications.filter((application) => application.id !== id);
        setApplications(newApplications);
      });
  };



  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "rollnumber", headerName: "ROLL No", width: 120 },
    { field: "classandsection", headerName: "CLASS AND SECTION", width: 120 },
    { field: "mobilenumber", headerName: "Mobile No", width: 120 },
    { field: "subject", headerName: "Subject", width: 200 },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      filterable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        if (params.row.status == "Accepted") {
          return <p className="badge badge-success px-3 py-1 mt-3">Accepted</p>;
        } else if(params.row.status == "Rejected"){
          return <p className="badge badge-danger px-3 py-1 mt-3">Rejected</p>;
        }else{
          return <p className="badge badge-primary px-3 py-1 mt-3">Pending</p>;
        }
      },
    },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
          <Link
            to={`view/${params.id}`}
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

  return (
    <>
      <Typography variant="h4" noWrap component="div" sx={{ mb: 2 }}>
        Applications
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <label>
          <select className="form-control ml-3" onChange={setNewApplications}>
            <option value="All">ALL </option>
            <option value="Urgent">Urgent  Applications</option>
            <option value="Normal">Normal  Applications</option>
          </select>
        </label>
      </Box>
      <DataGrid
        style={{ height: 430, width: "100%" }}
        rows={applications}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        loading={loading}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this Application?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When Applications are deleted they are completely removed, and they can not
            be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteApplication(applicationId);
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

export default Applications;
