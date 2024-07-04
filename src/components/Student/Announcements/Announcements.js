import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Announcements() {
  const token = reactLocalStorage.get("token");;
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let getUserData = async () => {

      await axios
        .get(`http://localhost:5000/student/announcements`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setAnnouncements(response.data.result);
            console.log(response.data.result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);


  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" noWrap component="div">
          Announcements
        </Typography>
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
    </>
  );
}

export default Announcements;
