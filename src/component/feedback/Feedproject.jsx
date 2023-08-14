
import { useState, useEffect } from "react";
import { Divider } from "@material-ui/core";
import { Typography, Box, Container } from "@mui/material";
import { FavoriteBorder } from "@material-ui/icons";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core";

import api from "../../api/Articles";
import Comments from "../../posts/Comments";
import RenderComments from "../../posts/RenderComments";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable'
import Button from '@mui/material/Button';



const useStyles = makeStyles({
    root: {
        color: '#0172cb'
    },

    imageSize: {
        width: "100%",
        height: "300px"
    }
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


const Feedproject = ({
    id,
    text,
    title,
    image,
    reaction,
    created_at,
    author,
    openPost,
    setOpenPost,
    onHandleReaction,
    user
}) => {


    const classes = useStyles();


    const [comments, setComments] = useState([])

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await api.get(`/articles/${id}/comments/`)
                console.log(response.data.results);
                setComments(response.data?.results)
            } catch (err) {
                console.log(`Error: ${err.message}`);

            }
        }
        getComments(...comments);
        // eslint-disable-next-line
    }, [id])

    console.log(comments)






    return (

        <div className={'menu ' + (openPost && "active")}>
            {
                <>
                    <Divider sx={{ border: "solid red" }} />
                    <Paper elevation={2} sx={{ mt: 2, width: "100%", }} className="newheight" >
                        <Box sx={{ mb: 2, mx: 3, display: "flex", height: "50px", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography variant="subtitle1" component={'h4'} style={{ fontWeight: "bold" }}>Announcement</Typography>
                            </Box>
                            <Box>
                                <CloseIcon onClick={() => { setOpenPost(!openPost) }} sx={{ cursor: "pointer" }} />
                            </Box>


                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Box sx={{ mx: 2 }}>
                                    <Avatar src={author.avatar} alt="user" />
                                </Box>
                                <Box>
                                    <Typography variant="subtitel" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                        {author.fullname}
                                    </Typography>
                                    <Typography variant="body2" component="p" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                        {author.username}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {created_at}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 2, }}>


                                {(() => {
                                    if (reaction === 0) {
                                        return <FavoriteBorder style={{ cursor: "pointer" }} onClick={() => onHandleReaction(id)} />
                                    } else if (reaction < 10) {
                                        return (
                                            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Box>

                                                    <FavoriteBorder style={{ cursor: "pointer", color: "#00a58e" }} onClick={() => onHandleReaction(id)} />
                                                </Box>
                                                <Box>
                                                    <Typography style={{ fontWeight: "600" }} variant="body2" component={'p'}>{reaction}</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    } else if (reaction >= 10) {
                                        return (
                                            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30px" }}>
                                                <Box>

                                                    <FavoriteIcon style={{ color: "#00a58e", cursor: "pointer" }} onClick={() => onHandleReaction(id)} />
                                                </Box>
                                                <Box>
                                                    <Typography style={{ color: "#00a58e", fontWeight: "600" }} variant="body2" component={'p'}>{reaction} reactions</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                })()}

                            </Box>
                        </Box>
                        <Box sx={{ mx: 2 }}>
                            <Typography variant="subtitel" sx={{ fontWeight: "bold" }} style={{ color: "#4F5E71" }} >
                                {title}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: "normal", py: 2 }} style={{ color: "#697D95" }}>
                                {text}
                            </Typography>
                        </Box>
                        <Box>
                            {image ? <img src={image} alt="user" style={{ width: "100%" }} className={classes.imageSize} /> : ""}
                        </Box>
                        <hr />
                        <br />
                        <Container sx={{ paddingBottom: "20px", }}>
                            <Typography variant='h6' component={"p"}>comments</Typography>
                            <Divider style={{ marginBottom: "20px" }} />
                            <RenderComments
                                id={id}
                                author={author}
                                created_at={created_at}
                                text={text}
                                image={image}
                                title={title}
                                comments={comments}
                                setComments={setComments}
                                user={user}
                            />
                        </Container>
                        <Container sx={{ borderRadius: "5px", mt: 2 }}>
                            <Comments
                                id={id}

                            />
                        </Container>
                    </Paper>
                </>
            }
        </div>

    )
}
export default Feedproject;











