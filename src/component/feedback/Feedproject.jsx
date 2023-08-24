
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



const useStyles = makeStyles({
    root: {
        color: '#0172cb'
    },

    imageSize: {
        width: "100%",
        height: "300px",
        borderRadius: "5px"
    }
});





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
    user,
    setShowFeed,
    fetchPosts,

}) => {

    const classes = useStyles();
    const [comments, setComments] = useState([])

    const getComments = async () => {
        try {
            const response = await api.get(`/articles/${id}/comments/`)
            console.log(response.data?.results);
            setComments(response.data?.results)
        } catch (err) {
            console.log(`Error: ${err.message}`);

        }
    }
    useEffect(() => {
        getComments(...comments);
        // eslint-disable-next-line
    }, [id]);

    const formate = (date) => {


        const options = {
            year: "numeric",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        };
        const formattedDate = new Date(date).toLocaleDateString('en-Us', options) //format(newDate);

        const [month, day, year, hour, minute] = formattedDate.split(' ');

        return `${day} ${month} ${year} ${hour} ${minute}`
    }

    return (

        <div className={'menu ' + (openPost && "active")}>
            {
                <>
                    {/* <Divider sx={{ border: "solid red" }} /> */}
                    <Box >
                        <Paper elevation={2} sx={{ mt: 2, p: 1, border: "1px solid #f9f9f9", borderRadius: "5px", boxShadow: "none" }} className="newheight" >
                            <Box sx={{ my: 1, mx: 3, display: "flex", height: "50px", justifyContent: "space-between", alignItems: "center" }}>
                                <Box>
                                    <Typography variant="subtitle1" component={'h4'} style={{ fontWeight: "bold" }}>{"General Announcement"}</Typography>
                                </Box>
                                <Box>
                                    <CloseIcon onClick={() => { setOpenPost(); setShowFeed() }} sx={{ cursor: "pointer" }} />
                                </Box>


                            </Box>
                            {/* <Divider /> */}
                            <Box sx={{ border: "1px solid lightgrey", borderRadius: "5px" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 2 }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Box sx={{ mx: 2 }}>
                                            <Avatar src={author.avatar} alt="user" />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitel" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                                {author.fullname}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {formate(created_at)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 2, }}>


                                        {(() => {
                                            if (reaction === 0) {
                                                return <FavoriteBorder style={{ cursor: "pointer" }} onClick={onHandleReaction} />
                                            } else if (reaction < 10) {
                                                return (
                                                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Box>

                                                            <FavoriteBorder style={{ cursor: "pointer", color: "#00a58e" }} onClick={onHandleReaction} />
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

                                                            <FavoriteIcon style={{ color: "#00a58e", cursor: "pointer" }} onClick={onHandleReaction} />
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

                                <div style={{ padding: "20px" }}>
                                    {image ? <img src={image} alt="user" style={{ width: "100%" }} className={classes.imageSize} /> : ""}
                                </div>
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
                                    {...comments}
                                    fetchPosts={fetchPosts}
                                />
                            </Container>
                            <Box sx={{ borderRadius: "5px", mt: 5, marginRight: "20px" }}>
                                <Comments
                                    id={id}
                                    fetchPosts={fetchPosts}
                                    getComments={getComments}
                                />
                            </Box>
                        </Paper>
                    </Box>
                </>
            }
        </div>

    )
}
export default Feedproject;
