import { useState, useContext, useEffect } from 'react'
import { dataContext } from '../../Context'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            width: '300px',
        },
    },

}));

const SearchBox = () => {
    const classes = useStyles();

    const [...posts] = useContext(dataContext)
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

    // useEffect(() => {
    //     searcresults()
    // }, [])

    // const searcresults = (event) => {
    //     const query = event.target.value.toLowerCase();

    //     const filteredResources = updatedResources.filter((item) => {
    //         // Check if any of the keys contain the query
    //         for (const key in item) {
    //             if (typeof item[key] === 'string' && item[key].toLowerCase().includes(query)) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     });

    //     setSearch(filteredResources);
    // };

    console.log(resource)

    return (
        <div className='search'>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="outlined-basic"
                    label="search anything here..."
                    variant="outlined"
                    onChange={searcresults}
                    inputProps={{
                        style: {
                            height: "5px",

                        }
                    }}
                />
            </form>


        </div>
    )
}

export default SearchBox;


