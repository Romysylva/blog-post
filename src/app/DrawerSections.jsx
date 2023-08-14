import { useState } from "react";

import {  withStyles } from "@material-ui/core/styles";
import  Drawer  from "@material-ui/core/Drawer";
import  Grid  from "@material-ui/core/Grid";
import  Button  from "@material-ui/core/Button";
import  List  from "@material-ui/core/List";
import  ListItem  from "@material-ui/core/ListItem";
import  ListItemIcon  from "@material-ui/core/ListItemIcon";
import  ListItemText  from "@material-ui/core/ListItemText";
import  ListSubheader  from "@material-ui/core/ListSubheader";
import  Typography  from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import  ShowChartIcon  from "@material-ui/icons/ShowChart";
import { colors } from "@material-ui/core";

const styles = theme => ({
    alignContent: {
        alignSelf: "center",
        colors: "red"
    }

});

const ListItems = ({items, onClick}) => 
items
.filter(({hidden}) => !hidden)
.map(({label, disabled, Icon}, i) => (
    <ListItem
    button
    key={i}
    disabled={disabled}
    onClick={() => onClick(label)}
    >
    <ListItemIcon>
        <Icon/>
    </ListItemIcon>
    <ListItemText>{label}</ListItemText>
    </ListItem>
));

const DrawerSections = withStyles(styles)(({classes}) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('Home');
    const [items] = useState({
        cpu: [
            {label: "Add CPU", Icon: AddIcon},
            {label: "Remove CPU", Icon: RemoveIcon},
            {label: "Usage", Icon: ShowChartIcon},
        ],
        memory: [
            {label: "Add Memory", Icon: AddIcon},
            {label: "Usage", Icon: ShowChartIcon},
        ],
        storage: [
            {label: "Add Storage", Icon: AddIcon},
            {label: "Usage", Icon: ShowChartIcon},
        ],
        network: [
            {label: "Add Network", Icon: AddIcon, disabled: true},
            {label: "Usage", Icon: ShowChartIcon},
        ]
    });
    const onClick = content => ()  => {
        setOpen(false); 
        setContent(content);
    };
    // const handleOpen = () => {
    //     setOpen(!open)
    // }

    return (
        <Grid container justifyContent="space-between">
            <Grid item className={classes.alignContent}>
                <Typography>{content}</Typography>
            </Grid>
            <Grid item >
                <Drawer open={open} onClose={() => setOpen(false)}>
                    <List>
                        <ListSubheader>CPU</ListSubheader>
                        <ListItems items={items.cpu} onClick={onClick}/>
                        <ListSubheader>Memory</ListSubheader>
                        <ListItems items={items.memory} onClick={onClick}/>
                        <ListSubheader>Storage</ListSubheader>
                        <ListItems items={items.storage} onClick={onClick}/>
                        <ListSubheader>Network</ListSubheader>
                        <ListItems items={items.network} onClick={onClick}/>
                    </List>
                </Drawer>
            </Grid>
            <Grid item>
                <Button onClick={() => setOpen(!open)}>
                    {open ? "Hide" : "Show"} Drawer
                </Button>
            </Grid>
        </Grid>
    );
});

export default DrawerSections;





