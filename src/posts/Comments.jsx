import React, { useState, useEffect } from 'react'


import { fade, makeStyles } from "@material-ui/core";
import { IconButton } from '@material-ui/core';
import { Box, Container } from "@mui/material";
import SendIcon from '@material-ui/icons/Send';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import MicNoneIcon from '@material-ui/icons/MicNone';
import MoodIcon from '@material-ui/icons/Mood';
import VoiceChatOutlinedIcon from '@material-ui/icons/VoiceChatOutlined';
import api from '../api/Articles';
import { TextField } from "@mui/material"

const useStyles = makeStyles(theme => ({
    root: {
        color: '#0172cb',
        // border: "1px solid red",
        overflow: "hidden",
        borderRadius: 5,
        backgroundColor: "#fff",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        width: "300px",
        height: "fit-content",
        padding: "20px",
        outline: "none",
        border: "none",


        "&:hover": {
            backgroundColor: "#0172cb",
            color: "#fff"
        },
        "&$focused": {
            backgroundColor: "#fff",
            boxShadow: `${fade(theme.palette.primary.main,)}  0 0 0 2px`,
            borderColor: theme.palette.primary.main
        },
        focused: {},
    },

    commentStyle: {
        position: "fixed",
        bottom: "0",
        zIndex: "2",
        background: "#1E2938",
        color: "#fff",

    },
    textAreaStylle: {
        color: '#0172cb',

    },

}));


const Comments = ({ id }) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [text, setText] = useState('')
    const [url, setObjectURL] = useState('')
    const classes = useStyles()

    const handleImage = (event) => {
        const file = event.target.files[0]
        setSelectedImage(file)
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setObjectURL(objectUrl)
        }
    }
    function removeBlob(url) {
        const urlParts = url.split(':');
        if (urlParts.length > 1 && urlParts[0] === "blob") {
            return urlParts.slice(1).join(':')
        }
        return url;
    }

    const modifiedImageUrl = removeBlob(url)
    console.log(modifiedImageUrl)
    const [postComment, setPostcomment] = useState(
        {
            "text": "",
            "image": selectedImage
        }
    );

    const Post = {
        text: text,
        image: selectedImage
    }

    const handlePostComment = async () => {
        const url = `/articles/${id}/comments/`;
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
        };
        try {
            const response = await api.post(url, Post, config)
            console.log(response.data)
            setPostcomment(response.data);

        } catch (err) {
            console.log(`Error: ${err.message}`)
        }
        document.location.reload();

    }


    return (
        <Container style={{ borderRadius: "5px", width: "370px", mb: 2, }} className={classes.commentStyle} >


            <Box sx={{ pt: 4 }}>
                <form action="">
                    <TextField color='primary' label="Reply..." type='text' name='text' id='text' onChange={(e) => setText(e.target.value)} className={classes.root} />
                </form>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center", cursor: "pointer", }}>

                <Box style={{ width: "100%", color: "gray" }}>
                    <TextField className={classes.textAreaStylle}
                        sx={{ border: "none", }}
                        id="choose-file"
                        required
                        InputProps={{

                            endAdornment: (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "-200px", color: "gray" }}>
                                    <IconButton
                                        aria-label='upload'
                                        component="label"
                                    >
                                        <AddCircleIcon style={{ color: "grey" }} />
                                        <input type='file'
                                            hidden
                                            onChange={handleImage}
                                            name='image'
                                            id='image'
                                        />

                                    </IconButton>

                                    <FormatColorTextIcon style={{ marginLeft: "6px", fontSize: "20px", cursor: "pointer " }} />
                                    <MoodIcon style={{ marginLeft: "6px", fontSize: "20px", cursor: "pointer " }} />
                                    <AlternateEmailIcon style={{ marginLeft: "6px", fontSize: "20px", cursor: "pointer " }} />
                                    <VoiceChatOutlinedIcon style={{ marginLeft: "6px", fontSize: "20px", cursor: "pointer " }} />
                                    <MicNoneIcon style={{ marginLeft: "6px", fontSize: "20px", cursor: "pointer " }} />
                                </Box>
                            )
                        }}

                    />
                </Box>
                <Box><SendIcon className={classes.textAreaStylle} onClick={() => handlePostComment(id)} /></Box>
            </Box>


        </Container>


        // < div >
        // <form onSubmit={handlePostComment}>

        //     {/* <input type='text' name='text' id='text' onChange={(e) => handelPost(e)} /> */}
        //     <input type='text' name='text' id='text' onChange={(e) => setText(e.target.value)} />
        //     <input type="file" name='image' id='image' onChange={handleImage} />

        //     <button type='submit'>send</button>
        //     {/* <input type="submit" /> */}
        // </form>
        // </ >


    )
}

export default Comments;
