import React, { useEffect, useState } from 'react'


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
        // transition: theme.transitions.create(["border-color", "box-shadow"]),
        width: "300px",
        outline: "none",
        border: "none",


        "&:hover": {
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
        bottom: "20px",
        zIndex: "2",
        background: "#fff",
        color: "#fff",

    },
    textAreaStylle: {
        color: '#0172cb',
        marginRight: "20px"

    },
    textfiled: {
        padding: "30x"
    }

}));


const Comments = ({
    id,
    getComments,
    fetchPosts
}) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [text, setText] = useState('')
    const [url, setObjectURL] = useState('')
    const [resets, setResets] = useState(false)
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
    // eslint-disable-next-line 
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

        setResets(!resets)
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

        // finally {
        // }
        if (getComments) {
            getComments();
        }
        setText('')
    }

    useEffect(() => {

        setText('')
    }, [resets])

    // const handleChange = (e) => {
    //     setText(e.target.value)

    // }


    return (
        <Container sx={{ borderRadius: "5px", width: "350px", py: 1, marginLeft: "10px" }} className={classes.commentStyle}  >
            <Box sx={{ border: " 1px solid lightgrey", width: "340px", marginLeft: "-25px", p: 1, borderRadius: "5px" }}>

                <Box >
                    <form action="">
                        <TextField
                            autoComplete='off'
                            // autoFocus="on" 
                            // value={'Reply...'}
                            value={text}
                            style={{ paddingBottom: "20px", }}
                            color='primary' placeholder="Reply..."
                            type='text' name='text' id='text'
                            onChange={(e) => setText(e.target.value)}
                            className={classes.root}
                            sx={{
                                "& fieldset": { border: '1px solid lightgrey' },
                                marginLeft: "10px",

                            }}
                        />
                    </form>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>

                    <Box style={{ width: "100%", color: "gray", }}>
                        <TextField className={classes.textAreaStylle}
                            id="choose-file"
                            required
                            sx={{
                                "& fieldset": { border: 'none' },
                            }}
                            InputProps={{

                                endAdornment: (
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "-190px", color: "gray", }}>
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
                    <Box ><SendIcon className={classes.textAreaStylle} onClick={() => handlePostComment(id)} /></Box>
                </Box>
            </Box>



        </Container>
    )
}

export default Comments;
