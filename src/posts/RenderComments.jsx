import React, { useState, useEffect } from 'react'
import { Typography, Box } from "@mui/material";
import { FavoriteBorder } from "@material-ui/icons";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Avatar } from "@mui/material";
import api from "../api/Articles";



const RenderComments = ({
    id,
    created_at,
    comments,
    setComments,
    fetchPosts
}) => {

    const [commentsReeaction, setCommnentsReaction] = useState([])

    const commentReactions = async (d) => {

        try {
            const response = await api.post(`/articles/${id}/comments/${d}/reaction`, {
                "comment": 0
            });
            console.log(response.data)
            const serverResponse = response.data
            setCommnentsReaction(serverResponse.map((item) => {
                if (item.id === id) {
                    return { ...item, reaction: item.reaction + 1 }
                } else {
                    return item
                }
            }))
        } catch (err) {
            console.log(`Error: ${err.message}`)
        }

        renderComments();

    }



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
    useEffect(() => {
        renderComments()
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
        <div>
            {
                comments.map((item, index) => {
                    return (

                        <Box key={index} sx={{ border: "1px solid #f2f2f2", my: 2, px: 1, borderRadius: '5px' }}>

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 2, }}>
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
                                                return <FavoriteBorder style={{ cursor: "pointer" }} onClick={() => commentReactions(item.id)} />
                                            } else if (item.reaction < 10) {
                                                return (
                                                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Box>

                                                            <FavoriteBorder style={{ cursor: "pointer", color: "#00a58e" }} onClick={() => commentReactions(item.id)} />
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

                                                            <FavoriteIcon style={{ color: "#00a58e", cursor: "pointer" }} onClick={() => commentReactions(item.id)} />
                                                        </Box>
                                                        <Box>
                                                            <Typography style={{ color: "#00a58e", fontWeight: "600" }} variant="body2" component={'p'}>{item.reaction} reactions</Typography>
                                                        </Box>
                                                    </Box>
                                                )
                                            }
                                        })()

                                    }

                                </Box>
                            </Box>
                            <Box sx={{ pt: 2, borderRadius: "5px" }}>

                                {item.image ? <img src={item.image} alt="user" style={{ width: "100%", borderRadius: "5px" }} /> : ""}
                            </Box>
                            <Box sx={{ mx: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: "normal", py: 2 }} style={{ color: "#697D95" }}>
                                    {item.text}
                                </Typography>
                            </Box>
                            <Box>

                                <Typography variant="body2" component="p">
                                    {formate(created_at)}
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
