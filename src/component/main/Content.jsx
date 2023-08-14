import { useContext, useState, useEffect } from 'react';
import { dataContext } from '../../Context';
import { makeStyles } from "@material-ui/core";
import { Typography, Box, } from "@mui/material";
import { FavoriteBorder, ShareOutlined, ReplyOutlined, } from "@material-ui/icons";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { Avatar } from "@mui/material"
import api from "../../api/Articles"








const useStyles = makeStyles({
    root: {
        color: '#0172cb'
    },

    imageSize: {
        width: "100%",
        height: "300px"
    }
});



const Content = ({ id, onHandleReaction, onShowCardDetails, openPost, onSearchPost }) => {

    const [postReaction, setPostReaction] = useState(
        []
    )
    const [...posts] = useContext(dataContext)



    // useEffect(() => {


    //     handlePostReaction(id)
    // }, [id])

    const handlePostReaction = async (id) => {
        try {
            const response = await api.post(`/articles/${id}/reaction`, {

                "articles": 0
            });
            console.log(response.data);
        } catch (err) {
            console.log(`Error: ${err.message}`);
            console.log("clicked")
        }
        handleReaction()
    }

    const handleReaction = () => {
        setPostReaction(postReaction.map((item) => {
            if (item.id === id) {
                return { ...item, articles: item.articles + 1 }
            } else {
                return item
            }
        }))
    }


    const classes = useStyles();

    return (
        <div className={'menu' + (openPost && "active")} style={{ width: "100%" }}>

            {
                posts?.map((item, index) => (

                    <Paper elevation={2} sx={{ my: 2, width: "100%", cursor: "pointer" }} key={index} >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Box sx={{ mx: 2 }}>
                                    <Avatar src={item.author.avatar} alt={item.username} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitel" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                        {item.author.fullname}
                                    </Typography>
                                    <Typography variant="body2" component="p" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                        {item.author.username}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {item.created_at}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 1, }}>

                                {(() => {
                                    if (item.reaction === 0) {
                                        return <FavoriteBorder style={{ cursor: "pointer" }} onClick={() => handlePostReaction(item.id)} />
                                    } else if (item.reaction < 10) {
                                        return (
                                            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Box>

                                                    <FavoriteBorder style={{ cursor: "pointer", color: "#00a58e" }} onClick={() => handlePostReaction(item.id)} />
                                                </Box>
                                                <Box>
                                                    <Typography style={{ fontWeight: "600" }} variant="body2" component={'p'}>{item.reaction}</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    } else if (item.reaction >= 10) {
                                        return (
                                            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30px" }}>
                                                <Box>

                                                    <FavoriteIcon style={{ color: "#00a58e", cursor: "pointer" }} onClick={() => handlePostReaction(item.id)} />
                                                </Box>
                                                <Box>
                                                    <Typography style={{ color: "#00a58e", fontWeight: "600" }} variant="body2" component={'p'}>{item.reaction} reactions</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                })()}
                                <Box sx={{ marginLeft: "10PX" }}>
                                    <ReplyOutlined style={{ color: "#00a58e", cursor: "pointer" }} />
                                </Box>
                                <ShareOutlined style={{ cursor: "pointer", marginLeft: "10px" }} />
                            </Box>
                        </Box>
                        <Box sx={{ mx: 2 }}>
                            <Typography variant="subtitel" sx={{ fontWeight: "bold" }} style={{ color: "#4F5E71" }} >
                                {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: "normal", py: 2 }} style={{ color: "#697D95" }}>
                                {item.text}
                            </Typography>
                        </Box>
                        <Box>
                            {item.image ? <img src={item.image} alt="" className={classes.imageSize} /> : ""}
                        </Box>
                        <Box sx={{ mx: 2, mb: 2, display: "flex", justifyContent: "space-between", paddingBottom: "20px" }} >
                            <Box sx={{ display: "flex" }}>
                                <Chip label={<InsertCommentIcon style={{ color: "#0172cb", marginTop: "10px", fontSize: "25px" }} />} style={{ height: "30px", borderRadius: "0", maxWidth: "45px" }} /><Typography marginLeft={"5px"} className={classes.root}>{item.comments} replies</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }} >
                                <Typography onClick={() => { onShowCardDetails(item) }}>{item.author.username}</Typography>
                                <ChevronRightOutlinedIcon style={{ color: "red" }} />

                            </Box>
                        </Box>
                    </Paper>
                ))
            }
        </div>

    );
}

export default Content;