
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { dataContext } from "./Context";
import Content from "./component/main/Content";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Feedproject from "./component/feedback/Feedproject";
import Appbar from "./component/Appbar";
import api from "./api/Articles";
import NewAppbar from "./component/NewAppbar"

const useStyles = makeStyles((theme) => ({
    root: {

    },
    app: {
        maxWidth: "1200px",
        margin: "auto",
        marginLeft: "270px",
        alignItems: "center"
    },
    appbar: {
        width: "100%"
    },
    control: {
        height: " fit-content",
        overflowY: "auto",
        paddingBottom: "50px",
    },
    root1: {
        flexGrow: 1
    },
    Paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));


const App = ({ id, searchPost, handlePostReaction, renderComments }) => {
    const classes = useStyles()

    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(null);
    const [openPost, setOpenPost] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)


    const [showFeed, setShowFeed] = useState(false)

    console.log('post recieve from context', posts)
    const resource = [...posts]
    let newResources = []

    const [search, setSearch] = useState(resource)
    let updatedResources = [...posts]

    const searcresults = (event) => {
        const query = event.target.value;
        updatedResources = updatedResources.filter((item, index) => {
            if (Object.keys(item) === searcresults) {
                return resource === item[`${searcresults}`]
            } else {
                newResources.push(posts);
                return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            }
        });
        return setSearch(newResources)
    }

    const handleMenuOpen = () => {
        if (openPost) {
            setOpenPost(!openPost)
        } else {
            setOpenPost(!openPost)

        }

    }


    const handelShowFeed = () => {
        setShowFeed(!showFeed)
    }


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
    useEffect(() => {
        // handelSort()
        fetchPosts();
    }, [])

    const showCards = (id) => {
        setShow(id);
        handleMenuOpen();
        handelShowFeed()
    };

    const handelSort = () => {
        setPosts([...posts].sort((a, b) => b.reaction - a.reaction));
        fetchPosts();

    }
    return (
        <>
            <div className={classes.app}>

                {/* <FeedMenuOverlay openPost={openPost} setOpenPost={setOpenPost} /> */}
                <dataContext.Provider value={posts}>
                    <Appbar setOpenDialog={setOpenDialog} openDialog={openDialog} className={classes.appbar}
                        {...posts}
                    />
                    {/* <NewAppbar/> */}

                    <Box sx={{ display: "flex", gap: "20px" }}>
                        <Box sx={{ width: "70%",  }} >

                            {

                                <Content
                                    {...posts}
                                    onShowCardDetails={showCards}
                                    openPost={openPost}
                                    id={id}
                                    onSearchPost={searchPost}
                                    fetchPosts={fetchPosts}
                                    search={search}
                                />
                            }
                        </Box>

                        <Box sx={{ width: "30%"}}>
                            <Paper variant="outline" >
                                {
                                    show?.id
                                        ? <Feedproject
                                            {...show}
                                            {...posts}
                                            openPost={openPost}
                                            setOpenPost={() => setOpenPost(false)}
                                            showFeed={showFeed}
                                            setShowFeed={() => setShow(null)}
                                            onHandleReaction={handlePostReaction}
                                            fetchPosts={fetchPosts}
                                        // renderComments={renderComments}


                                        />
                                        : null
                                }
                            </Paper>
                        </Box>
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