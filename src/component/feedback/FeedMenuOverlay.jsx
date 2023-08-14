import React from 'react'

const FeedMenuOverlay = ({ openPost, setOpenPost }) => {
    return (
        <div className={'feedMenuOverlay ' + (openPost && "active")}>

        </div>
    )
}

export default FeedMenuOverlay
