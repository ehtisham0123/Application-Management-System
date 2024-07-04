import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";


function Suggestions() {
  const user_id = reactLocalStorage.get("user_id");
  const token = reactLocalStorage.get("token");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [suggestionId, setSuggestionId] = useState();

  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/student/suggestions`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            setSuggestions(response.data.result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);

  const deleteSuggestion = async (id) => {
    await axios
      .delete(`http://localhost:5000/student/suggestions/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        const newSuggestions = suggestions.filter(
          (suggestion) => suggestion.id !== id
        );
        setSuggestions(newSuggestions);
      });
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" noWrap component="div">
          Suggestions
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <div></div>
        <Link
          to={`/student/suggestions/create`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button variant="contained" startIcon={<AddIcon />}>
            New Suggestion
          </Button>
        </Link>
      </Box>
      <ul className="announcements">
        {suggestions[0] ? (
          suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <div className="announcements-body">
                <div className="announcements-header">
                  <div>
                    {suggestion.isHidden ? (
                      <span className="userimage">
                        {/* Hide the image */}
                      </span>
                    ) : (
                      <span className="userimage">
                        <img
                          src={"/uploads/" + suggestion.student.avatar}
                          alt={suggestion.student.name}
                        />
                      </span>
                    )}
                    {suggestion.isHidden ? (
                      <span className="username">Student Details Hidden</span>
                    ) : (
                      <span className="username">
                        {suggestion.student.firstname} {suggestion.student.lastname}
                      </span>
                    )}
                  </div>
                </div>
                <div className="announcements-content">
                  <h4 className="template-title">{suggestion.name}</h4>
                  <p>{suggestion.details}</p>
                </div>

                {user_id === suggestion.student_id && (
                  <div className="announcements-footer">
                    <Link
                      to={`/student/suggestions/edit/${suggestion.id}`}
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
                        setSuggestionId(suggestion.id);
                        setOpen(true);
                      }}
                      style={{ background: "red" }}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>
            <div class="timeline-body">No Suggestions...</div>
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
          {"Are you sure you want to delete this suggestion?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When suggestions are deleted, they are completely removed, and they
            cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteSuggestion(suggestionId);
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

export default Suggestions;