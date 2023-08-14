import * as React from 'react';
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import Button from '@mui/material/Button';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable'



const useStyles = makeStyles({
    root: {
        color: '#0172cb',

    },

    Box: {
        paddingBottom: "5px",

        fontSize: "20px",
        fontWeight: "bold",
    },
    mainContainer: {
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: "#1E2938",
        color: "#fff",
        padding: "10px 0",
        borderRadius: "5px"

    },
    formStyle: {
        width: "100%",
        paddingLeft: "20px"
    },
});


function PaperComponent(props) {

    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function PostContent() {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create Post
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">

                    <div className={classes.mainContainer}>
                        <form className={classes.formStyle}>
                            <Box className={classes.Box}>

                                <Typography variant='subtitle1' component={"p"}><label >Title</label></Typography>
                                <input type="text" placeholder='title' required id='title' name='title' style={{ width: "90%" }} />
                            </Box>
                            <Box className={classes.Box}>

                                <Typography><label >Text</label></Typography>

                                <textarea type="text" placeholder='text' id='text' name='text' required style={{ width: "90%", height: "100px", border: "1px solid grey", resize: "none" }} />
                            </Box>
                            <Box className={classes.Box}>

                                <Typography><label >Image</label></Typography>

                                <input type="file" required id='image' name='image' />
                            </Box>
                        </form>
                        <Box><SendIcon style={{ marginLeft: "auto", color: "#fff", width: "90%", cursor: "pointer", color: "red" }} /></Box>
                    </div>
                </DialogTitle>
            </Dialog>
        </div>
    );
}
