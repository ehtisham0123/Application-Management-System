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


function PersonalApplications() {

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" noWrap component="div">
          Personal Applications
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
              to={`create/leave`}
            >
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Leave
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
              to={`create/instructor change`}
            >
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Instructor Change
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
              to={`create/timetable change`}
            >
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Timetable Change
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
              to={`create/paper retotalling`}
            >
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Paper Retotalling
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
              to={`create/harassment`}
            >
              <Card sx={{ py: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Harassment
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
              to={`create/transport`}
            >
              <Card sx={{ py: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Transport
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
              to={`create/result`}
            >
              <Card sx={{ py: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Result
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
              to={`create/other-purpose`}
            >
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Other Purpose
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
              to={`create/complaint`}
            >
              <Card sx={{ py: 2 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Application For
                  </Typography>
                  <Typography variant="h5" component="div">
                    Complaint
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

export default PersonalApplications;
