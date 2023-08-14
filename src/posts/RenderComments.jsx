import React, { useState, useEffect, useContext } from 'react'
import { dataContext } from '../Context';
import { Typography, Box } from "@mui/material";
import { FavoriteBorder } from "@material-ui/icons";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Avatar } from "@mui/material";
import api from "../api/Articles";



const RenderComments = ({
    id,
    text,
    title,
    image,
    reaction,
    created_at,
    author,
    openPost,
    onHandleReaction,
    comments,
    setComments,
    user
}) => {



    // const [getcomments, setGetComments] = useState([])

    const [commentsReeaction, setCommnentsReaction] = useState([])

    const commentReactions = async () => {
        const reaction = {
            "comment": 0,
            "status": false
        }
        try {
            const response = await api.post(`/articles/${id}/comments/${id}/reaction`, reaction);
            console.log(response.data)
            const serverResponse = response.data
            setCommnentsReaction(commentsReeaction.map((item) => {
                if (item.id === id) {
                    return { ...item, reaction: item.reaction + 1 }
                } else {
                    return item
                }
            }))
        } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }



    useEffect(() => {
        const renderComments = async () => {

            try {
                const response = await api.get(`/articles/${id}/comments/`);
                console.log(response.data.results)
                setComments
                    (response.data?.results)
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }


        }
        renderComments(...comments)
    }, [id])
    return (
        <div>
            {
                comments.map((item, index) => {
                    return (

                        <Box key={index}>

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 2 }}>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Box sx={{ mx: 2 }}>
                                        {<Avatar src={item.user.avatar} alt="user" />}
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitel" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                            {item.user.fullname}
                                        </Typography>
                                        <Typography variant="body2" component="p" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                                            {item.user.username}
                                        </Typography>

                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 2, }}>

                                    {


                                        (() => {
                                            if (item.reaction === 0) {
                                                return <FavoriteBorder style={{ cursor: "pointer" }} onClick={() => commentReactions(id)} />
                                            } else if (item.reaction < 10) {
                                                return (
                                                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Box>

                                                            <FavoriteBorder style={{ cursor: "pointer", color: "#00a58e" }} onClick={() => commentReactions(id)} />
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

                                                            <FavoriteIcon style={{ color: "#00a58e", cursor: "pointer" }} onClick={() => commentReactions(id)} />
                                                        </Box>
                                                        <Box>
                                                            <Typography style={{ color: "#00a58e", fontWeight: "600" }} variant="body2" component={'p'}>{reaction} reactions</Typography>
                                                        </Box>
                                                    </Box>
                                                )
                                            }
                                        })()

                                    }

                                </Box>
                            </Box>
                            <Box sx={{ mx: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: "normal", py: 2 }} style={{ color: "#697D95" }}>
                                    {item.text}
                                </Typography>
                            </Box>
                            <Box>
                                {item.image ? <img src={item.image} alt="user" style={{ width: "100%" }} /> : ""}

                                <Typography variant="body2" component="p">
                                    {created_at}
                                </Typography>
                            </Box>

                        </Box>

                    )

                })
            }

        </div>
    )
}

export default RenderComments;
