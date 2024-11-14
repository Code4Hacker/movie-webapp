import React from 'react'
import { baseUrlImage } from '../provider/baseURLs'
import { getGenre } from '../provider/requests/hitmydb'
const MovieCard2 = ({ item, setWatchlists }) => {
    return (
        <div className='movie_card2'>
            <div className='' style={{
                backgroundImage: `url(${baseUrlImage}${item.poster_path})`
            }}>
                <div className="shadow">
                </div>
            </div>
            <div className="">
                <div className="contents2">
                    <p className='bolder'>{(item.title?.length > 24 ? `${item.title.substring(0, 24)}...` : item.title)}</p>
                </div>
                <div className="content">
                    {
                        item.genre_ids.map((item, key) => <span key={key}>{getGenre({ id: item })}.</span>)
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieCard2