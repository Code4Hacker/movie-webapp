import React, { useEffect } from 'react'
import { baseUrlImage } from '../provider/baseURLs'
import { imdbImage } from '../assets'
import Aos from 'aos'
import { getGenre } from '../provider/requests/hitmydb'
const MovieCard2 = ({ item, setWatchlists }) => {
    Aos.init();
    return (
        <div className='movie_card2'>
            <div className='' style={{
                backgroundImage: `url(${baseUrlImage}${item.poster_path})`
            }} data-aos="fade-up">
                <div className="shadow">
                </div>
            </div>
            <div className="">

                {/* <div className="" style={{
                    display: 'flex',
                    textAlign: "center",
                    alignItems: 'center',
                    gap: '10px',
                    position: 'absolute',
                    left: '10px',
                    top: '10px'
                }}>
                    <div className="" style={{
                        display: 'flex',
                        textAlign: "center",
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <img src={imdbImage} alt="" width={36} />
                        <span style={{ fontWeight: 900 }}>{item.vote_average}</span>
                    </div>
                </div> */}
                <div className="contents">
                    <h6 className='bolder'>{(item.title?.length > 24 ? `${item.title.substring(0, 24)}...` : item.title)}</h6>
                    {/* <p style={{
                        fontSize: '12px',
                        textTransform: 'uppercase'
                    }}><b style={{
                        // color:'var(--secondary)'
                    }}>Release date: </b><span>{item.release_date}</span></p> */}

                    {/* <button className='watch2' style={{ position: 'relative', zIndex: 2, width: '220px', zIndex: 3 }} onClick={() => addWatchList({ movie: item })}>Add to Watchlist</button> */}
                </div>
                <div className="content2">
                    {
                        item.genre_ids.map((item, key) => <span key={key}>{getGenre({ id: item })}.</span>)
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieCard2