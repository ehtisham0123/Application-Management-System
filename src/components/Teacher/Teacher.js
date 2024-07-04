// Home
import Home from "./Home";

// Application Organizers Assignments
import Sessions from "./Sessions/Sessions";

import Suggestions from "./Suggestions/Suggestions";


// Applications
import Applications from "./Applications/Applications";
import ForwardedApplications from "./Applications/ForwardedApplications";
import Application from "./Applications/Application";
import ApplicationViewer from "./Applications/ApplicationViewer";


// Announcements
import Announcements from "./Announcements/Announcements";
import CreateAnnouncement from "./Announcements/CreateAnnouncement";
import EditAnnouncement from "./Announcements/EditAnnouncement";

// Profile
import EditProfile from "./Profile/EditProfile";
import Profile from "./Profile/Profile";

// Students
import Student from "./Sessions/Students/Student";
import Students from "./Sessions/Students/Students";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolIcon from '@mui/icons-material/School';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AssistantIcon from '@mui/icons-material/Assistant';


import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  background: 'gray',
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));



function Teacher() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = reactLocalStorage.get("token");
  const avatar = reactLocalStorage.get("user_avatar");
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [listOpen, setListOpen] = useState(false);
  const teacher_role = reactLocalStorage.get("teacher_role");
  useEffect(() => {
    if (!reactLocalStorage.get('token')) {
      navigate('/teacher-login');
    }
    if (reactLocalStorage.get('user_role') !== "teacher") {
      navigate('/teacher-login');
    }
  }, []) 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setListOpen(!listOpen);
  };

  const logout = () => {
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_name');
    reactLocalStorage.remove('user_role');
    reactLocalStorage.remove('user_avatar');
    navigate('/teacher-login');
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml: 3 }}>
            Application Process System
          </Typography>
          <img
            src="logo_1.png"
            height="65px"
            width="65px"
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link
            to={`/teacher/profile`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname.includes("teacher/profile")}>
              <ListItemIcon>
                <img src={`/uploads/${avatar}`} className=" user_img mr-2" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>{reactLocalStorage.get("user_name")}</ListItemText>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Divider />
          <Link
            to={`/teacher`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname == `/teacher`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>
                Home
              </ListItemText>
            </ListItem>
          </Link>

          {teacher_role == 'Lecturer' ? (
            <Link
              to={`forwarded-applications`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button selected={location.pathname.includes("teacher/applications")}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>
                  Applications
                </ListItemText>
              </ListItem>
            </Link>
          ) : (
            <>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Applications" primaryTypographyProps={{ fontSize: '19px' }} />
                {listOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={listOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link
                    to={`/teacher/applications`}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <ListItem button selected={location.pathname.includes("teacher/applications")}>
                      <ListItemIcon>
                      </ListItemIcon>
                      <ListItemText>All Applications</ListItemText>
                    </ListItem>
                  </Link>
                  <Link
                    to={`/teacher/forwarded-applications`}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <ListItem button selected={location.pathname.includes("teacher/forwarded-applications")}>
                      <ListItemIcon>
                      </ListItemIcon>
                      <ListItemText>
                        Forwarded Applications
                      </ListItemText>
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
            </>
          )}

          <Link
            to={`/teacher/announcements`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname.includes("teacher/announcements")}>
              <ListItemIcon>
                <NotificationsActiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>Announcements</ListItemText>
            </ListItem>
          </Link>
          {teacher_role !== 'Lecturer' &&
            <Link
              to={`/teacher/suggestions`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItem button selected={location.pathname.includes("teacher/suggestions")}>
                <ListItemIcon>
                  <AssistantIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>Suggestions</ListItemText>
              </ListItem>
            </Link>
          }
        </List>
        <Divider />
        <List>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>Logout</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ p: 2 }}>
          <Routes>
            {/* Home */}
            <Route exact path={'/'} element={<Home />} />

            {/* Profile */}
            <Route path={'/profile/edit/'} element={<EditProfile />} />
            <Route path={'/profile/'} element={<Profile />} />

            {/* Applications */}
            <Route exact path={'/applications'} element={<Applications />} />

            {/* Students */}
            <Route path={'/sessions/students/:session/:discipline/student-profile/:id'} element={<Student />} />

            {/* Applications */}
            <Route exact path={'/applications'} element={<Applications />} />
            <Route exact path={'/forwarded-applications'} element={<ForwardedApplications />} />
            <Route exact path={'/applications/view/:id'} element={<Application />} />
            <Route exact path={'/forwarded-applications/view/:id'} element={<Application />} />
            <Route
              path={`/applications/view/:id/:file/:file_type`}
              element={<ApplicationViewer />}
            />
            <Route
              path={`/forwarded-applications/view/:id/:file/:file_type`}
              element={<ApplicationViewer />}
            />

            {/* Suggestions */}
            <Route exact path={'/suggestions'} element={<Suggestions />} />

            {/* Announcements */}
            <Route exact path={'/announcements'} element={<Announcements />} />
            <Route path={'/announcements/create'} element={<CreateAnnouncement />} />
            <Route path={'/announcements/edit/:id'} element={<EditAnnouncement />} />
          </Routes>
        </Box>
      </Main>
    </Box>
  );
}

export default Teacher;
