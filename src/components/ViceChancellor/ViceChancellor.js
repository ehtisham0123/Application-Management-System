// Home
import Home from "./Home";

// Profile
import EditProfile from "./Profile/EditProfile";
import Profile from "./Profile/Profile";

import Suggestions from "./Suggestions/Suggestions";

// Applications

import ForwardedApplications from "./Applications/ForwardedApplications";
import Application from "./Applications/Application";
import ApplicationViewer from "./Applications/ApplicationViewer";


// Announcements
import Announcements from "./Announcements/Announcements";
import CreateAnnouncement from "./Announcements/CreateAnnouncement";
import EditAnnouncement from "./Announcements/EditAnnouncement";

import  { useState,useEffect } from "react";
import { Link, Routes, Route ,useNavigate , useLocation} from "react-router-dom";
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
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AssistantIcon from '@mui/icons-material/Assistant';

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

function ViceChancellor() {
  const navigate  = useNavigate();
  const location = useLocation();
  const avatar = reactLocalStorage.get("user_avatar");
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  useEffect(()=>{
    if (!reactLocalStorage.get('token')) {
      navigate('/vice-chancellor-login');
    }
    if (reactLocalStorage.get('user_role') !== "vice-chancellor") {
      navigate('/vice-chancellor-login');
    }
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("user_id");
    reactLocalStorage.remove("user_name");
    reactLocalStorage.remove("user_role");
    navigate('/vice-chancellor-login')
  };



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
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml:3 }}>
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
            to={`/vice-chancellor/profile`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button selected={location.pathname.includes("vice-chancellor/profile")}>
              <ListItemIcon>
                 <img src={`/uploads/${avatar}`} className=" user_img mr-2" />
              </ListItemIcon>

              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>{reactLocalStorage.get("user_name")}</ListItemText>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Divider />
          <Link
            to={`/vice-chancellor`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname == `/vice-chancellor`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Home
              </ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/vice-chancellor/forwarded-applications`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname == `/vice-chancellor/forwarded-applications`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Applications
              </ListItemText>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Logout</ListItemText>
        </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ p: 2 }}>
          <Routes>
            {/* Home */}
            <Route exact path={`/`} element={<Home />} />

            {/* Profile */}
            <Route path={`/profile/edit/`} element={<EditProfile />} />
            <Route path={`/profile/`} element={<Profile />} />
 
            {/* Applications */}
            {/* <Route exact path={'/applications'} element={ <Applications />} /> */}
            <Route exact path={'/forwarded-applications'} element={ <ForwardedApplications />} />
            {/* <Route exact path={'/applications/view/:id'} element={ <Application />} /> */}
            <Route exact path={'/forwarded-applications/view/:id'} element={ <Application />} />
            <Route
              path={`/forwarded-applications/view/:id/:file/:file_type`}
              element={ <ApplicationViewer />}
            />
         {/* Suggestions */}
         <Route exact path={'/suggestions'} element={<Suggestions />} />
         
            {/* Announcements */}
            <Route exact path={`/announcements`} element={<Announcements />} />
            <Route
              path={`/announcements/create`}
              element={<CreateAnnouncement />}
            />
            <Route
              path={`/announcements/edit/:id`}
              element={<EditAnnouncement />}
            />
          </Routes>
        </Box>
      </Main>
    </Box>
  );
}

export default ViceChancellor;
