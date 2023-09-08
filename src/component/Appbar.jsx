import React, { useState, useEffect } from "react";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { darken, makeStyles, useTheme, } from '@material-ui/core/styles';
import { Box } from '@mui/material';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AddIcon from "@material-ui/icons/Add"
import { Chip } from "@mui/material";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';







// #ba5d00 #E8EDF1 #697D95 #4F5E71


import Img from '../assets/Avatar.png'
import Img2 from '../assets/Avatar1.png'
import SearchBox from "./main/SearchBox";



const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.6em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      backgroundColor: "#fafefe"
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#90A4AE',
      // outline: '1px solid slategrey',
      borderRadius: "6px",
      border: "3px solid #CFD8DC"
    }
  },
  root: {
    display: 'flex',
    // width: "100%",
    backgroundColor: "#fff"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,

    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      boxShadow: "0 0 3px grey"
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#fff"
  },
  ListItem: {
    backgroundColor: "#fff",
    '&:hover': {
      backgroundColor: "#4F5E71"
    }
  },
  accordion: {
    boxShadow: "none"
  },
  subroot: {
    width: "100%",
    maxWidth: "360",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    cursor: "pointer",
    width: "95%",
    margin: "auto",
    borderRadius: "5px",
    '&:hover': {
      backgroundColor: "#00a58e",
      color: "#fff",
    },
  },
  nested1: {
    paddingLeft: theme.spacing(5),
    cursor: "pointer",
    width: "95%",
    margin: "auto",
    borderRadius: "5px",
    backgroundColor: "#00a58e",
    color: "#fff",
    '&:hover': {
      backgroundColor: darken('#00a58e', .3),

    },
  },
  fold: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#f9f9f9",
    color: "#ba5d00",

    '&:hover': {
      backgroundColor: '#090909',
      color: "#fff"
    }
  },
  notificationD: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    flexWrap: "wrap-reverse",
  }


}));





function Appbar(props) {
  const { searchResults } = props


  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

  // useEffect(() => {
  //   localStorage.setItem("darkMode", JSON.stringify(darkMode));

  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);






  // eslint-disable-next-line 
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line 
  const [content, setContent] = useState('Home');
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {

    setMenu(!menu)
  }
  const [menu1, setMenu1] = useState(false);

  const handleMenu1 = () => {

    setMenu1(!menu1)
  }
  const [menu2, setMenu2] = useState(false);

  const handleMenu2 = () => {

    setMenu2(!menu2)
  }
  const [menu3, setMenu3] = useState(false);

  const handleMenu3 = () => {

    setMenu3(!menu3)
  }
  const [menu4, setMenu4] = useState(false);

  const handleMenu4 = () => {

    setMenu4(!menu4)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onClick = content => () => {
    setOpen(false);
    setContent(content);
  };

  const drawer = (
    <div>
      <Box style={{ height: "65px", display: "flex", alignItems: "center" }}>
        <Typography style={{ color: "#00a58e", marginLeft: "20px", fontWeight: "bold" }}>
          Future HQ
        </Typography>
      </Box>

      <Divider />

      <div className={classes.subroot}>

        <List component="nav">
          <ListItem button onClick={handleMenu} style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography style={{ color: "#ba5d00", fontWeight: "bold" }}>
              {"Announcement"}
            </Typography>
            {menu ? <ExpandLess className={classes.fold} /> : <ExpandMore className={classes.fold} />}
          </ListItem>
          <Collapse in={menu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <List button className={classes.nested1}>
                <ListItemText primary="General Announcement" />
              </List>
              <List button className={classes.nested}>
                <ListItemText primary="Classroom Announcements" />
              </List>
            </List>
          </Collapse>
          <ListItem button onClick={handleMenu1} style={{ display: "flex", justifyContent: "space-between" }}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <BookOutlinedIcon style={{ color: "#ba5d00", marginLeft: "-10px" }} />
              <Typography primary="classroom" style={{ color: "#ba5d00", fontWeight: "bold", marginLeft: "5px" }} >
                Classroom
              </Typography>
            </Box>
            {menu1 ? <ExpandLess className={classes.fold} /> : <ExpandMore className={classes.fold} />}
          </ListItem>
          <Collapse in={menu1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <List button className={classes.nested}>
                <ListItemText primary="Course outlines" />
              </List>
              <List button className={classes.nested}>
                <ListItemText primary="Class Schedule" />
              </List>
              <List button className={classes.nested}>
                <ListItemText primary="Assignments" />
              </List>
              <List button className={classes.nested}>
                <ListItemText primary="My Grades" />
              </List>
              <List button className={classes.nested}>
                <ListItemText primary="Class Resources" />
              </List>
            </List>
          </Collapse>
          <ListItem button onClick={handleMenu2} style={{ display: "flex", justifyContent: "space-between" }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <AcUnitIcon style={{ color: "#ba5d00", marginLeft: "-10px" }} />
              <Typography style={{ color: "#ba5d00", fontWeight: "bold", marginLeft: "5px" }}>
                {"Communities"}
              </Typography>
            </Box>
            {menu2 ? <ExpandLess className={classes.fold} /> : <ExpandMore className={classes.fold} />}
          </ListItem>
          <Collapse in={menu2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <List button className={classes.nested} style={{ display: "flex" }}>
                <ListItemText primary="FutureLabs HQ" />
                <Chip label="+10" style={{ color: "#0172cb", fontWeight: "bold", marginRight: "10px", fontSize: "12px", width: "47px", }} />
              </List>
              <List button className={classes.nested}>
                <ListItemText primary="Design 2023 " />
              </List>
            </List>
          </Collapse>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AddIcon />
            <Typography component={"p"} variant="subtitle" style={{ fontWeight: 'bold', marginLeft: "10px" }}>Create a community</Typography>
          </Box>
          <ListItem button onClick={handleMenu3} style={{ display: "flex", justifyContent: "space-between" }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <WorkOutlineIcon style={{ color: "#ba5d00", marginLeft: "-10px" }} />
              <Typography style={{ color: "#ba5d00", fontWeight: "bold", marginLeft: "5px" }}>
                {"Projects"}
              </Typography>
            </Box>
            {menu3 ? <ExpandLess className={classes.fold} /> : <ExpandMore className={classes.fold} />}
          </ListItem>
          <Collapse in={menu3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <List button className={classes.nested}>
                <ListItemText primary="FutureLabs HQ" />
              </List>
              <List button className={classes.nested}>
                <ListItemText primary="Design 2023 " />
              </List>
            </List>
          </Collapse>
          <ListItem button onClick={handleMenu4} style={{ display: "flex", justifyContent: "space-between" }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <MailOutlineIcon style={{ color: "#ba5d00", marginLeft: "-10px" }} />
              <Typography style={{ color: "#ba5d00", fontWeight: "bold", marginLeft: '5px' }}>
                {'Messages'}
              </Typography>
            </Box>
            {menu4 ? <ExpandLess className={classes.fold} /> : <ExpandMore className={classes.fold} />}
          </ListItem>
          <Collapse in={menu4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <List button className={classes.nested}>
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-10px" }}>
                  <img src={Img} alt="" />
                  <ListItemText primary="Olivia Rhyne" style={{ marginLeft: "20px" }} />
                </Box>
              </List>
              <List button className={classes.nested}>
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-10px" }}>
                  <img src={Img} alt="user" />
                  <ListItemText primary="Olivia Rhyne" style={{ marginLeft: "20px" }} />
                </Box>
              </List>
              <List button className={classes.nested}>
                <Box style={{ display: "flex", alignItems: "center", marginLeft: "-10px" }}>
                  <img src={Img} alt="" />
                  <ListItemText primary="Olivia Rhyne" style={{ marginLeft: "20px" }} />
                </Box>
              </List>
              <List button className={classes.nested}>
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-10px" }}>
                  <img src={Img} alt="" />
                  <ListItemText primary="Olivia Rhyne" style={{ marginLeft: "20px" }} />
                </Box>
              </List>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div >
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar style={{ backgroundColor: "#fff" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              style={{ color: "#ba5d00" }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", color: " black", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <Box >
                <Box className="navText">

                  <Typography variant="h6" component={"p"}  >
                    General Announcement
                  </Typography>
                  {/* <PostContent /> */}

                </Box>
              </Box>
              <div className="search" >
                <SearchBox onSearchResults={searchResults} />
              </div>
              {/* <div className={classes.notificationD} > */}
              <Box sx={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center" }}>
                <NotificationsNoneIcon style={{ marginRight: "40px" }} />
{/* 
                <span className="" onClick={() => setDarkMode(!darkMode)}>

                  <SettingsOutlinedIcon style={{ cursor: "pointer" }} />
                </span> */}

                <img src={Img2} alt="person" />
                <Box>
                  <Typography variant='p' component={'h4'}>
                    Olivia Rhye
                  </Typography>
                  <Typography variant='p' component={"p"}>
                    FL-23432
                  </Typography>
                </Box>
              </Box>
              {/* </div> */}
            </Box>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,

              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar}>
          </div>

        </main>
      </div>
    </div>
  );
}


export default Appbar;