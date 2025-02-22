import React, { useEffect, useState } from 'react'
import { Loading, MovieCard, SiderBar } from '../../../components'
import { bannerImage, imdbImage } from '../../../assets'
import { BookmarkFill, Search, Wifi } from 'react-bootstrap-icons'
import { baseUrlImage } from '../../../provider/baseURLs'
import { Carousel, Container, Divider, Tooltip, Whisper } from 'rsuite'
import Aos from 'aos'
import toast from 'react-hot-toast'
import { movieProviderPath, popularPath, searchPath, topratedPath, trendingsPath, upcomingPath } from '../../../statics/urls'
import { Link, useParams } from 'react-router-dom'
import { fetchAllMovie } from '../../../provider/requests/fetchallmovie'


const MovieTrailer = () => {
    const [bannerMovie, setBannerMovie] = useState(JSON.parse(window.localStorage.getItem("contents"))??{});
    const [movies, setMovies] = useState([]);

    
    const searchMovie = async (title) => {
        try {
            let movies = fetchAllMovie(`${searchPath({
                query: title,
                page: 1
            })}`);
            if ((await movies).status === 200) {
                setMovies((await movies).data.results.splice(0, 5));
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        Aos.init()
    }, []);
    const params = useParams();
    const tooltip = (
        <Tooltip className='tooltip_'>
            <div className="container">
                {
                    movies?.length > 0 ? movies.map((item, key) =>
                        <div className='search_movie' key={key}>
                            <img src={`${baseUrlImage}${item.poster_path}`} alt="" />
                            <div className="content">
                                <div className="">
                                    <p>{item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}</p>
                                    <span>{item.original_title.length > 24 ? `${item.original_title.substring(0, 24)}...` : item.original_title}</span>
                                </div>
                            </div>
                        </div>
                    ) : <div className="empty">
                        <p><span><Wifi /></span> Search you're Movies</p>
                    </div>
                }


            </div>
        </Tooltip>
    );
    const bookmarks = (
        <Tooltip className='tooltip_' style={{
            maxHeight:'800px'
        }}>
            <div className="container">
                <h6  style={{
                    fontWeight:900
                }}>WATCHLISTS</h6>
                <Divider style={{
                    backgroundColor:'var(--secondary)'
                }}/>
                {
                    movies?.length > 0 ? movies.map((item, key) =>
                        <Link className='search_movie' key={key}>
                            <img src={`${baseUrlImage}${item.poster_path}`} alt="" />
                            <div className="content">
                                <div className="">
                                    <p>{item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}</p>
                                    <span>{item.original_title.length > 24 ? `${item.original_title.substring(0, 24)}...` : item.original_title}</span>
                                </div>
                            </div>
                        </Link>
                    ) : <div className="empty">
                        <p><span><BookmarkFill /></span> Sign Up to Add your watchlists</p>
                    </div>
                }


            </div>
        </Tooltip>
    );
    return (
        <div className='home_page movie_slug'>
            <Loading />
            
            <div className="grid">
                <div className="grid_items">
                    <SiderBar />
                </div>
                <div className="grid_items">
                    <div className="topnav full_level">
                        <Whisper
                            placement="bottom" controlId="control-id-click" trigger="click" speaker={tooltip}>
                            <div className="input">
                                <input type="text" placeholder='search movie title...' onChange={(e) => searchMovie(e.target.value)} />
                                <button><Search /></button>
                            </div>
                        </Whisper>
                        <Whisper
                            placement="bottom" controlId="control-id-click" trigger="click" speaker={bookmarks}>
                            <button className='icon'>
                                <BookmarkFill />
                            </button>
                        </Whisper>
                        <div className="avatar">
                            <img src={bannerImage} alt="" />
                            <div className="shadow_over"></div>
                        </div>

                    </div>
                    <div className="watch_container">
                    <div className="banner" style={{
                                    backgroundImage: `url(${baseUrlImage}${bannerMovie.backdrop_path})`
                                }} >
                                    <div className="shadow_over">
                                        <div className="contents">
                                            <Container>
                                                <h1 className='animate__animated animate__fadeInUp'>{bannerMovie.title}</h1>
                                                <p className='animate__animated animate__fadeInUp  animate__delay-1s'>{bannerMovie.overview}</p>
                                                <div className="animate__animated animate__fadeInUp  animate__delay-2s" style={{
                                                    display: 'flex',
                                                    textAlign: "center",
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <img src={imdbImage} alt="" width={50} />
                                                    <span style={{ fontWeight: 900 }}>{bannerMovie.vote_average}</span>
                                                </div>

                                                <div className="flex">
                                                    <button className='watch animate__animated animate__fadeInUp  animate__delay-3s' style={{ position: 'relative', zIndex: 2 }}>Watch Now</button>
                                                    <button className='watch animate__animated animate__fadeInUp  animate__delay-3s' style={{ position: 'relative', zIndex: 2 }}>Add to Watchlist</button>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>
                                </div>
                    </div>
                    <div className="container">
                        <h4 className='bolder'>Upcoming Movies</h4>
                        <MovieCard item={bannerMovie}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieTrailer