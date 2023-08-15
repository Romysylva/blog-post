import React, { useState } from "react";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, } from '@material-ui/core/styles';
import { Box } from '@mui/material';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Chip } from "@mui/material";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";

// import ExpandMoreIcon from "@material-ui/core/ExpandMore";



// #ba5d00 #E8EDF1 #697D95 #4F5E71


import Img from '../assets/Avatar2.png'
import SearchBox from "./main/SearchBox";
import PostContent from "./main/PostContent";
import { Work } from "@material-ui/icons";
const myStyles = makeStyles({
  // root: {
  //   backgroundColor: '#ffffff',


  // },
});

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: "100%",
    backgroundColor: theme.palette.background.paper
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
      // marginLeft: drawerWidth,
    },


  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),

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
    paddingLeft: theme.spacing(5),
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "#00a58e",
      color: "#fff",

    }
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
  }

}));



const ListItems = ({ items, onClick }) =>
  items
    .filter(({ hidden }) => !hidden)
    .map(({ label, disabled, Icon, data, url }, i) => (
      <ListItem
        button
        key={i}
        disabled={disabled}
        onClick={() => onClick(label, data, url)}
      >
        <ListItemIcon>
          {/* <Icon/> */}
          {url}
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
        <ListItemText>{data}</ListItemText>
      </ListItem>
    ));



function Appbar(props) {
  const { setOpenDialog, openDialog } = props;
  const { searchResults } = props

  const contents = myStyles();

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

  const [items] = useState({
    announcement: [
      { label: "General Announcement", Icon: AddIcon },
      { label: "Classroom Announcements", Icon: RemoveIcon },
    ],
    classroom: [
      { label: "Course outlines", Icon: RemoveIcon, },
      { label: "Class Schedule", Icon: ShowChartIcon },
      { label: "Assignments", Icon: ShowChartIcon },
      { label: "My Grades", Icon: ShowChartIcon },
      { label: "Class Resources", Icon: ShowChartIcon },
    ],
    Communities: [
      { label: "FutureLabs HQ", Icon: RemoveIcon, data: <Chip label="+10" style={{ color: "#0172cb", fontWeight: "bold" }} /> },
      { label: "Design 2023 ", Icon: ShowChartIcon }

    ],
    projects: [
      // {label: "Add Network", Icon: RemoveIcon, disabled: true},
      // {label: "Usage", Icon: ShowChartIcon},
    ],
    messages: [
      { label: "Olivia Rhyne", url: <img src={Img} alt="" />, Icon: RemoveIcon },
      { url: <img src={Img} alt="" />, label: "Olivia Rhyne", Icon: RemoveIcon },
      { url: <img src={Img} alt="" />, label: "Olivia Rhyne", Icon: RemoveIcon },
      { url: <img src={Img} alt="" />, label: "Olivia Rhyne", Icon: RemoveIcon },
    ]
  });

  const drawer = (
    <div>
      <Box style={{ height: "65px", display: "flex", alignItems: "center" }}>
        <Typography style={{ color: "#00a58e", marginLeft: "20px", fontWeight: "bold" }}>
          Future HQ
        </Typography>
      </Box>

      <Divider />


      {/* <List className={classes.ListItem}>
        <ListSubheader style={{ color: "#ba5d00", fontWeight: "bold" }}>Announcement</ListSubheader>
        <ListItems items={items.announcement} onClick={onClick} />
        <ListSubheader style={{ color: "#ba5d00", fontWeight: "bold", display: "flex", alignItems: "center", }}><BookOutlinedIcon style={{ marginRight: "15px" }} />Classroom</ListSubheader>
        <ListItems items={items.classroom} onClick={onClick} />
        <ListSubheader style={{ color: "#ba5d00", fontWeight: "bold", display: "flex", alignItems: "center" }}><AcUnitIcon style={{ marginRight: "15px" }} />Communities</ListSubheader>
        <ListItems items={items.Communities} onClick={onClick} />
        <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
          <AddIcon style={{ fontSize: "20px", marginRight: "20px" }} /><Typography style={{ fontWeight: "bold" }}>{"Create a Community"}</Typography>
        </Box>
        <br />
        <ListSubheader style={{ color: "#ba5d00", fontWeight: "bold", display: "flex", alignItems: "center" }}><WorkOutlineIcon style={{ marginRight: "15px" }} />Projects</ListSubheader>
        <ListItems items={items.projects} onClick={onClick} />

        <ListSubheader style={{ color: "#ba5d00", fontWeight: "bold", display: "flex", alignItems: "center", }}><MailOutlineIcon style={{ fontSize: "20px", marginRight: "15px" }} />Direct Messagges</ListSubheader>

        <ListItems items={items.messages} onClick={onClick} />

      </List> */}
      {/* </ListContent> */}
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
              <List button className={classes.nested}>
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
                <Chip label="+10" style={{ color: "#0172cb", fontWeight: "bold", marginRight: "20px" }} />
              </List>
              <List button className={classes.nested}>
                <ListItemText primary="Design 2023 " />
              </List>
            </List>
          </Collapse>
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
                  <ListItemText primary="Olivia Rhyne" />
                </Box>
              </List>
              <List button className={classes.nested}>
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-10px" }}>
                  <img src={Img} alt="" />
                  <ListItemText primary="Olivia Rhyne" />
                </Box>
              </List>
              <List button className={classes.nested}>
                <Box style={{ display: "flex", alignItems: "center", marginLeft: "-10px" }}>
                  <img src={Img} alt="" />
                  <ListItemText primary="Olivia Rhyne" />
                </Box>
              </List>
              <List button className={classes.nested}>
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-10px" }}>
                  <img src={Img} alt="" />
                  <ListItemText primary="Olivia Rhyne" />
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
    <div className={'showDialog' + (openDialog && "active")}>
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
              style={{ color: "red" }}
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
              <SearchBox onSearchResults={searchResults} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{}}>
                  <NotificationsNoneIcon />
                </Box>
                <Box sx={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center" }}>

                  <img src={Img} alt="" />
                  <Box>
                    <Typography variant='p' component={'h4'}>
                      Olivia Rhye
                    </Typography>
                    <Typography variant='p' component={"p"}>
                      FL-23432
                    </Typography>
                  </Box>
                </Box>
              </Box>
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