import { useContext, useState } from 'react';
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
        color: '#0172cb',
    },

    imageSize: {
        height: "400px",
        width: "100%",
        borderRadius: "5px"
    },

    imageContainer: {
        Padding: "20px",
        // maringLeft: "30px",



    }
});



const Content = ({
    fetchPosts,
    onShowCardDetails,
    openPost,
    search

}) => {

    const [...posts] = useContext(dataContext)




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
        // handleReaction(id);
        fetchPosts()
        // onShowCardDetails();


    }

    // const handleReaction = (id) => {
    //     setPostReaction(postReaction.map((item) => {
    //         if (item.id === id) {
    //             return { ...item, reaction: item.reaction + 1 }
    //         } else {
    //             return item
    //         }
    //     }))
    // }


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


    const classes = useStyles();

    return (
        <div className={'menu' + (openPost && "active")} >

            {
                posts?.map((item, index) => (

                    <Paper sx={{ my: 2, cursor: "pointer", p: 1, boxShadow: "none" }} key={index} >
                        <Box sx={{ border: "1px solid #f1f3f3", borderRadius: "5px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pt: 2, pb: 4 }} >
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }} className='moveLeft'>
                                    <Box >
                                        <Avatar src={item.author.avatar} alt={item.username} className="allign" />
                                    </Box>
                                    <Box sx={{ marginLeft: "20px" }}>
                                        <Typography variant="subtitel" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                            {item.author.fullname}
                                        </Typography>
                                        <Typography variant="body2" component="p" style={{ color: "#697D95" }}>
                                            {formate(item.created_at)}
                                        </Typography>
                                    </Box>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='aligntop'>

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
                                                        <Typography style={{ color: "#00a58e", fontWeight: "600" }} variant="body2" component={'p'}>{item.reaction} <span className="navText">reactions</span></Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        }
                                    })()}
                                    <Box sx={{ marginLeft: "10PX" }}>
                                        <ReplyOutlined style={{ color: "#00a58e", cursor: "pointer" }} />
                                    </Box>
                                    <ShareOutlined style={{ cursor: "pointer", marginLeft: "10px" }} />
                                </div>
                            </Box>
                            <Box sx={{ mx: 2 }}>
                                <Typography variant="subtitel" sx={{ fontWeight: "bold" }} style={{ color: "#4F5E71" }} >
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: "normal", py: 2 }} style={{ color: "#697D95" }}>
                                    {item.text}
                                </Typography>
                            </Box>
                            <div style={{ padding: "20px" }}>
                                {item.image ? <img src={item.image} alt="" className={classes.imageSize} /> : ""}
                            </div>
                            <Box sx={{ mx: 2, mb: 2, display: "flex", justifyContent: "space-between", paddingBottom: "20px" }} >
                                <Box sx={{ display: "flex" }}>
                                    <Chip label={<InsertCommentIcon style={{ color: "#0172cb", marginTop: "10px", fontSize: "25px" }} />} style={{ height: "30px", borderRadius: "0", maxWidth: "45px" }} /><Typography marginLeft={"5px"} fontWeight={"bold"} className={classes.root}>{item.comments} Replies</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }} >
                                    <Typography onClick={() => { onShowCardDetails(item,index) }} style={{ fontWeight: "500" }}>view Replies</Typography>
                                    <ChevronRightOutlinedIcon style={{ color: "#00a58e" }} />

                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                ))
            }
        </div>

    );
}

export default Content;