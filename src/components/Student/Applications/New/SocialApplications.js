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


function SocialApplications() {

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" noWrap component="div">
          Social Applications
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
                to={`create/study tour`}
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
                      Study Tour
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
                to={`create/furniture issues`}
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
                      Furniture Issues
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
                to={`create/class cleaning`}
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
                      Class Cleaning
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
                to={`create/multimedia issues`}
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
                      Multimedia Issues
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
                to={`create/issues in lab`}
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
                      Issues In Lab
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
                to={`create/workstation`}
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
                      Workstation
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
                to={`create/electricity issues`}
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
                      Electricity Issues
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
        </Grid>
      </Box>
    </>
  );
}

export default SocialApplications;
