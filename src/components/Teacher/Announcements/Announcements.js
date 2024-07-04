import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


function Announcements() {
  const user_id = reactLocalStorage.get("user_id");
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [announcementId, setAnnouncementId] = useState();
  const [open, setOpen] = useState(false);
  const teacher_role = reactLocalStorage.get("teacher_role");

  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);

      await axios
        .get(`http://localhost:5000/teacher/announcements`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setAnnouncements(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      let getSessionData = async () => {
        setLoading(true);
        await axios
          .get(`http://localhost:5000/teacher/sessions`, {
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
    };
    getUserData();
  }, [reloading]);

  const setNewAnnouncements = async (e) => {
    if (e.target.value == "All") {
      setReloading(!reloading);
    } else {
      let data = e.target.value.split("|");
      let session = data[0];
      let discipline = data[1];
      setLoading(true);
      await axios
        .get(`http://localhost:5000/teacher/announcements/search`, {
          headers: {
            token: token,
          },
          params: {
            session: session,
            discipline: discipline,
          },
        })
        .then((response) => {
          if (response.data) {
            setAnnouncements(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const deleteAnnouncement = async (id) => {
    await axios
      .delete(`http://localhost:5000/teacher/announcements/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        const newAnnouncements = announcements.filter((announcement) => announcement.id !== id);
        setAnnouncements(newAnnouncements);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <label>
          <select className="form-control ml-3" onChange={setNewAnnouncements}>
            <option value="All">ALL</option>
            {sessions.map((session) => (
              <>
                <option value={`${session.name}|Computer Science`}>
                  Computer Science {session.name}
                </option>
                <option value={`${session.name}|Software Engineering`}>
                  Software Engineering {session.name}
                </option>
                <option value={`${session.name}|M. Phil.`}>
                  M. Phil. {session.name}
                </option>
              </>
            ))}
          </select>
        </label>
        {teacher_role !== 'Lecturer' &&

          <Link
            to={`/teacher/announcements/create`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button variant="contained" startIcon={<AddIcon />}>
              New
            </Button>
          </Link>
        }
      </Box>
      <ul className="announcements">
        {announcements[0] ? (
          announcements.map((announcement) => (
            <>
              {announcement.vice_chancellor ? (
                <li>
                  <div className="announcements-body">
                    <div className="announcements-header">
                      <div>
                        <span className="userimage">
                          <img
                            src={"/uploads/" + announcement.vice_chancellor.avatar}
                            alt={announcement.vice_chancellor.name}
                          />
                        </span>
                        <span className="username">
                          {announcement.vice_chancellor.firstname}{" "}
                          {announcement.vice_chancellor.lastname}
                        </span>
                      </div>
                      <span className="pull-right text-danger text-bold">
                        Vice Chancellor
                      </span>
                    </div>
                    <div className="announcements-content">
                      <h4 className="template-title">{announcement.name}</h4>
                      <p>{announcement.details}</p>
                    </div>
                    {teacher_role !== 'Lecturer' &&
                      <div className="announcements-footer">
                        <Link
                          to={`/vice-chancellor/announcements/edit/${announcement.id}`}
                          style={{ color: "inherit", textDecoration: "inherit" }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon />}
                            style={{ background: "orange" }}
                          >
                            Edit
                          </Button>
                        </Link>{" "}
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setAnnouncementId(announcement.id);
                            setOpen(true);
                          }}
                          style={{ background: "red" }}
                        >
                          Delete
                        </Button>
                      </div>
                    }
                  </div>
                </li>
              ) : announcement.teacher ? (
                <li>
                  <div className="announcements-body">
                    <div className="announcements-header">
                      <div>
                        <span className="userimage">
                          <img
                            src={"/uploads/" + announcement.teacher.avatar}
                            alt={announcement.teacher.name}
                          />
                        </span>
                        <span className="username">
                          {announcement.teacher.firstname}{" "}
                          {announcement.teacher.lastname}
                        </span>
                      </div>
                      <span className="pull-right text-danger text-bold">
                        Teacher
                      </span>
                    </div>
                    <div className="announcements-content">
                      <h4 className="template-title">{announcement.name}</h4>
                      <p>{announcement.details}</p>
                    </div>
                    {teacher_role !== 'Lecturer' &&
                      <div className="announcements-footer">
                        <Link
                          to={`/teacher/announcements/edit/${announcement.id}`}
                          style={{ color: "inherit", textDecoration: "inherit" }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon />}
                            style={{ background: "orange" }}
                          >
                            Edit
                          </Button>
                        </Link>{" "}
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setAnnouncementId(announcement.id);
                            setOpen(true);
                          }}
                          style={{ background: "red" }}
                        >
                          Delete
                        </Button>
                      </div>
                    }
                  </div>
                </li>
              ) : announcement.admin ? (
                <li>
                  <div className="announcements-body">
                    <div className="announcements-header">
                      <div>
                        <span className="userimage">
                          <img
                            src={"/uploads/" + announcement.admin.avatar}
                            alt={announcement.admin.name}
                          />
                        </span>
                        <span className="username">
                          {announcement.admin.firstname} {announcement.admin.lastname}
                        </span>
                      </div>
                      <span className="pull-right text-danger text-bold">
                        Admin
                      </span>
                    </div>
                    <div className="announcements-content">
                      <h4 className="template-title">{announcement.name}</h4>
                      <p>{announcement.details}</p>
                    </div>
                    {teacher_role !== 'Lecturer' &&
                      <div className="announcements-footer">
                        <Link
                          to={`/admin/announcements/edit/${announcement.id}`}
                          style={{ color: "inherit", textDecoration: "inherit" }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditIcon />}
                            style={{ background: "orange" }}
                          >
                            Edit
                          </Button>
                        </Link>{" "}
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setAnnouncementId(announcement.id);
                            setOpen(true);
                          }}
                          style={{ background: "red" }}
                        >
                          Delete
                        </Button>
                      </div>
                    }
                  </div>
                </li>
              ) : null}
            </>
          ))
        ) : (
          <li>
            <div class="timeline-body">No Announcements...</div>
          </li>
        )}
      </ul>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this announcement?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When announcements are deleted they are completely removed, and they can not
            be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteAnnouncement(announcementId);
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

export default Announcements;
