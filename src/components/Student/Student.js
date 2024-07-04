// Home
import Home from "./Home";

// Announcements
import Announcements from "./Announcements/Announcements";

import Suggestions from "./Suggestions/Suggestions";

 
// Profile
import EditProfile from "./Profile/EditProfile";
import Profile from "./Profile/Profile";


// Teachers
import Teachers from "./Teachers/Teachers";
import Teacher from "./Teachers/Teacher";

// Applications
import Applications from "./Applications/Applications";
import NewApplication from "./Applications/New/NewApplication";
import SocialApplications from "./Applications/New/SocialApplications";
import PersonalApplications from "./Applications/New/PersonalApplications";
import CreateApplication from "./Applications/New/CreateApplication";


import ApplicationsData from "./Applications/History/Applications";
import Application from "./Applications/History/Application";
import ApplicationViewer from "./Applications/History/ApplicationViewer";
import EditApplication from "./Applications/History/EditApplication";




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
import AssistantIcon from '@mui/icons-material/Assistant';

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import BookIcon from "@material-ui/icons/Book";

import CreateSuggestion from "./Suggestions/CreateSuggestion";
import EditSuggestion from "./Suggestions/EditSuggestion";

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

function Student() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = reactLocalStorage.get("token");
  const avatar = reactLocalStorage.get("user_avatar");
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    if (!reactLocalStorage.get('token')) {
      navigate('/student-login');
    }
    if (reactLocalStorage.get('user_role') !== "student") {
      navigate('/student-login');
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
    navigate('/student-login');
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
      src={`${process.env.PUBLIC_URL}/logo_1.png`}
      alt="Logo"
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
            to={`/student/profile`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname.includes("student/profile")}>
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
            to={`/student`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname == `/student`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>
                Home
              </ListItemText>
            </ListItem>
          </Link>
          {/* 
            <Link
              to={`/student/teachers`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
             <ListItem button selected={location.pathname.includes("student/teachers")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Teachers</ListItemText>
              </ListItem>
            </Link>
           */}
          <Link
            to={`/student/applications`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname.includes("student/applications")}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>Applications</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/student/announcements`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname.includes("student/announcements")}>
              <ListItemIcon>
                <NotificationsActiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>Announcements</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/student/suggestions`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname.includes("student/suggestions")}>
              <ListItemIcon>
                <AssistantIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: '19px' }}>Suggestions</ListItemText>
            </ListItem>
          </Link>
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

            {/* Announcements */}
            <Route exact path={'/announcements'} element={<Announcements />} />


            {/* Suggestions */}
            <Route exact path={'/suggestions'} element={<Suggestions />} />

            <Route
              path={`/suggestions/create`}
              element={<CreateSuggestion />}
            />
            <Route
              path={`/suggestions/edit/:id`}
              element={<EditSuggestion />}
            />


            {/* Teachers */}
            <Route exact path={`/teachers`} element={<Teachers />} />
            <Route
              path={`/teachers/teacher-profile/:id`}
              element={<Teacher />}
            />


            {/* Applications */}
            <Route
              exact
              path={`/applications`}
              element={<Applications />}
            />

            <Route
              exact
              path={`/applications/new-applications`}
              element={<NewApplication />}
            />
            <Route
              exact
              path={`/applications/new-applications/social`}
              element={<SocialApplications />}
            />
            <Route
              exact
              path={`/applications/new-applications/personal`}
              element={<PersonalApplications />}
            />
            <Route
              exact
              path={`/applications/new-applications/:purpose/create/:category`}
              element={<CreateApplication />}
            />

            {/* Application History */}
            <Route
              exact
              path={`/applications/applications-history/`}
              element={<ApplicationsData />}
            />
            <Route
              exact
              path={'/applications/applications-history/view/:id'}
              element={<Application />}
            />
            <Route path={`/applications/applications-history/edit/:id`} element={<EditApplication />} />
            <Route
              path={`/applications/applications-history/view/:id/:file/:file_type`}
              element={<ApplicationViewer />}
            />
          </Routes>
        </Box>
      </Main>
    </Box>
  );
}

export default Student;
