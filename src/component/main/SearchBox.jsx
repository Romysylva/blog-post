import { useState, useContext, useEffect } from 'react'
import { dataContext } from '../../Context'
import api from "../../api/Articles"


const SearchBox = () => {

    // const [...posts] = useContext(dataContext)

    const [search, SetSearch] = useState(
        {
            Posts: [],
            searchFiled: " "
        }
    )
    useEffect(() => {

        const getPost = async () => {
            try {
                const response = await api.get('/articles/')
                console.log(response.data?.results)
                SetSearch(response.data?.results)

            } catch (err) {
                console.log(`Error: ${err.message}`)
            }
        }
        getPost()
    }, [])
    const searchResults = (event) => {
        SetSearch({ searchFiled: event.target.value })
    }

    // const searchPost = search.Posts.filter(item => {
    //     return item.title.toLowerCase().includes(search.searchFiled.toLowerCase())
    // })
    return (
        <div>
            <input type='search' placeholder='search anything here...' onChange={searchResults} />


        </div>
    )
}

export default SearchBox;
