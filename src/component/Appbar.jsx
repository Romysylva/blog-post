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

// import ExpandMoreIcon from "@material-ui/core/ExpandMore";



// #ba5d00 #E8EDF1 #697D95 #4F5E71


import Img from '../assets/Avatar2.png'
import SearchBox from "./main/SearchBox";
import PostContent from "./main/PostContent";
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
  console.log(props)

  const contents = myStyles();

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // eslint-disable-next-line 
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line 
  const [content, setContent] = useState('Home');




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
      { url: <img src={Img} alt="" />, label: "Olivia Rhyne", Icon: RemoveIcon, data: "hello" },
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


      <List>
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
        {/* <Box sx={{display: "flex"}}> */}

        <ListItems items={items.messages} onClick={onClick} />

        {/* </Box> */}
      </List>
      {/* </ListContent> */}
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
            <Box sx={{ display: "flex", color: " black", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
              <Box sx={{ display: "flex", color: " black", border: "solid red", justifyContent: "space-between", alignItems: "center", width: "60%", flexWrap: "wrap" }}>
                <Box>

                  <Typography variant="h6" component={"p"} noWrap sx={{ color: "black", fontSize: { lg: "10px", xs: "10px", sm: "0.1px", md: "0.5px" } }}>
                    General Announcement
                  </Typography>
                  <PostContent />

                </Box>
                {/* <button onClick={() => setOpenDialog(!openDialog)}>Create Post</button> */}
                <Box
                  sx={{
                    width: '300px',

                  }}
                >
                </Box>
                {/* <SearchBox onSearchResults={searchResults} /> */}
              </Box>
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
          <div className={classes.toolbar} />

        </main>
      </div>
    </div>
  );
}

// Appbar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default Appbar;