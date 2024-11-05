import React from 'react'
import { baseUrlImage } from '../provider/baseURLs'
import { imdbImage } from '../assets'
import Aos from 'aos'

const MovieCard = ({item}) => {
    Aos.init()
  return (
    <div className='movie_card' style={{
        backgroundImage:`url(${baseUrlImage}${item.poster_path})`
    }} data-aos="fade-up">
        <div className="shadow">
            <div className="contents">
                <h6 className='bolder'>{(item.title?.length > 24 ? `${item.title.substring(0,24)}...`:item.title).toUpperCase()}</h6>
                <p>{(item.original_title?.length > 24 ? `${item.original_title.substring(0,24)}...`:item.original_title).toUpperCase()}</p>
                <div className="" style={{
                    display: 'flex',
                    textAlign: "center",
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <img src={imdbImage} alt="" width={32} />
                    <span style={{ fontWeight: 900 }}>{item.vote_average}</span>
                </div>
                <button className='watch2' style={{ position: 'relative', zIndex: 2, width:'220px' }}>Watch Now</button>
            </div>
        </div>
        
    </div>
  )
}

export default MovieCard