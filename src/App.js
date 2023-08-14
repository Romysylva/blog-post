
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
// import { data } from "./component/context/index";
import { dataContext } from "./Context";
import Content from "./component/main/Content";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Feedproject from "./component/feedback/Feedproject";
import Appbar from "./component/Appbar";
import api from "./api/Articles"
import FeedMenuOverlay from "./component/feedback/FeedMenuOverlay";
import PostContent from "./component/main/PostContent";
import SearchBox from "./component/main/SearchBox";

const useStyles = makeStyles({
    root: {

    },
    app: {
        maxWidth: "1024px",
        margin: "auto",
        // border: "solid red",
        // display: "flex",
        // justifyContent: "center"
    },
    appbar: {
        width: "100%"
    }
})

function App({ id, searchPost
}) {
    const classes = useStyles()
    // const [user, setUser] = useState([...data]);

    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(null);
    const [openPost, setOpenPost] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const [count, setCount] = useState([])



    const handleMenuOpen = () => {
        if (openPost) {
            setOpenPost(!openPost)
        } else {
            setOpenPost(!openPost)

        }

    }




    useEffect(() => {

        const fetchPosts = async () => {

            try {
                const response = await api.get('/articles/');
                console.log(response.data?.results)
                const result = response.data.results;
                setPosts(result)

            } catch (err) {

                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);

                } else {
                    console.log(`Error: ${err.message}`);
                }

            }

        }

        fetchPosts();

    }, [])

    // useEffect(() => {
    //     const handelgetReaction = async () => {
    //         try {
    //             const response = await api.get(`/articles/${id}/reaction/`);
    //             console.log(response.data.results);
    //             setGetReaction(response.data.results)
    //         } catch (err) {
    //             console.log(`Error: ${err.message}`);

    //         }
    //     }
    //     handelgetReaction();
    // }, [id])


    // const [count, setCount] = useState([]);

    useEffect(() => {
        const handlecount = async () => {
            const response = await api.get('/articles/');
            console.log(response.data.count)
            setCount(response.data.count)

        }

        handlecount();

    }, [])





    const showCards = (id) => {
        setShow(id);
        handleMenuOpen();

    };




    return (
        <>
            <Appbar setOpenDialog={setOpenDialog} openDialog={openDialog} className={classes.appbar} />
            <div className={classes.app} style={{}}>

                <FeedMenuOverlay openPost={openPost} setOpenPost={setOpenPost} />
                <SearchBox />
                <dataContext.Provider value={posts}>
                    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>

                        <Container>
                            <Box sx={{ width: "90%", display: "flex", margin: "auto", }}>

                                {

                                    <Content
                                        {...posts}
                                        onShowCardDetails={showCards}
                                        openPost={openPost}
                                        setOpenPost={setOpenPost}
                                        id={id}
                                        onSearchPost={searchPost}
                                    />
                                }
                            </Box>
                            <Box sx={{ width: "30%" }}>
                                <Paper variant="outline">
                                    {
                                        show?.id
                                            ? <Feedproject
                                                {...show}
                                                {...posts}

                                                openPost={openPost}
                                                setOpenPost={setOpenPost}

                                            />
                                            : null
                                    }
                                </Paper>
                            </Box>
                        </Container>
                    </Box>
                </dataContext.Provider>
            </div>
        </>
    );
}

export default App;

        // const showCardDetails = (id) => {
        //     setUser((prevuser) => ({
        //         ...prevuser,
        //         showFeed: !prevuser.showFeed,
        //     }));
        // };