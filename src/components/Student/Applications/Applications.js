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


function Applications() {

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" noWrap component="div">
          Applications
        </Typography>
      </Box>
      <Box>
          <Grid container spacing={2}>
           <Grid item xs={12} md={6} lg={4} xl={3}>
              <Paper elevation={24} />
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  to={`new-applications`}
                >
                  <Card sx={{ padding: 2 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 24 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        New
                      </Typography>
                      <Typography variant="h5" component="div">
                        Applications
                      </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Link>      
              <Paper />
            </Grid>  
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Paper elevation={24} />
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  to={`applications-history`}
                >
                  <Card sx={{ padding: 2 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 24 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Application
                      </Typography>
                      <Typography variant="h5" component="div">
                        History
                      </Typography>
                  
                    </CardContent>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Link>      
              <Paper />
            </Grid> 
           
          </Grid>
      </Box>
    </>
  );
}

export default Applications;
