import React, { useEffect, useState } from 'react'
import { Loading, MovieCard, SiderBar } from '../../components'
import { bannerImage, imdbImage } from '../../assets'
import { BellFill, Moon, MoonFill, Search, Wifi } from 'react-bootstrap-icons'
import { SampleData } from '../../raws'
import { accessKey, accessToken, baseUrl, baseUrlImage } from '../../provider/baseURLs'
import { Carousel, Container, Tooltip, Whisper } from 'rsuite'
import Aos from 'aos'
import axios from 'axios'
import { fetchAllMovie } from '../../provider/fetchallmovie'
import toast from 'react-hot-toast'
import { movieProviderPath, popularPath, topratedPath, trendingsPath, upcomingPath } from '../../statics/urls'


const Home = () => {
    const [bannerMovie, setBannerMovie] = useState([]);
    const [popular, setPopular] = useState([]);
    const [upcomings, setUpcomings] = useState([]);
    const [toprateds, setToprateds] = useState([]);
    const [movieprovider, setMovieProvider] = useState([]);
    const [movies, setMovies] = useState([]);
    const fetchmovies = async () => {
        try {
            let allTrendings = fetchAllMovie(`${trendingsPath}1`);
            let populars = fetchAllMovie(`${popularPath}1`);
            let upcomings = fetchAllMovie(`${upcomingPath}1`);
            let toprated = fetchAllMovie(`${topratedPath}1`);
            let movieProvider = fetchAllMovie(`${movieProviderPath}`);
            if ((await allTrendings).status === 200) {
                setBannerMovie((await allTrendings).data.results.splice(0, 5));
                setPopular((await populars).data.results.splice(0, 8));
                setToprateds((await toprated).data.results.splice(0, 8));
                setUpcomings((await upcomings).data.results.splice(0, 8));
                setMovieProvider((await movieProvider).data.results);
                toast.success("Great all data are Clear");

            } else {
                toast.error("something went wrong");
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        Aos.init()
        fetchmovies()
    }, [])
    const tooltip = (
        <Tooltip className='tooltip_'>
            <div className="container">
                {
                    popular.map((item, key) =>
                        <div className='search_movie' key={key}>
                            <img src={`${baseUrlImage}${item.poster_path}`} alt="" />
                            <div className="content">
                                <div className="">
                                    <p>{item.title}</p>
                                    <span>{item.original_title.length > 24 ? `${item.original_title.substring(0, 24)}...` : item.original_title}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="empty">
                    <p><span><Wifi /></span> Search you're Movies</p>
                </div>

            </div>
        </Tooltip>
    );
    return (
        <div className='home_page'>
            <Loading />
            <div className="grid">
                <div className="grid_items">
                    <SiderBar />
                </div>
                <div className="grid_items">
                    <div className="topnav">
                        <Whisper
                            placement="bottom" controlId="control-id-click" trigger="click" speaker={tooltip}>
                            <div className="input">
                                <input type="text" placeholder='search movie title...' />
                                <button><Search /></button>
                            </div>
                        </Whisper>
                        <button className='icon'>
                            <BellFill />
                        </button>
                        <div className="avatar">
                            <img src={bannerImage} alt="" />
                            <div className="shadow_over"></div>
                        </div>

                    </div>
                    <div className="">
                        <Carousel className='cc' autoplay autoplayInterval={5900}>
                            {
                                bannerMovie.map((item, key) => <div className="banner" style={{
                                    backgroundImage: `url(${baseUrlImage}${item.backdrop_path})`
                                }} key={key}>
                                    <div className="shadow_over">
                                        <div className="contents">
                                            <Container>
                                                <h1 className='animate__animated animate__fadeInUp'>{item.title}</h1>
                                                <p className='animate__animated animate__fadeInUp  animate__delay-1s'>{item.overview}</p>
                                                <div className="animate__animated animate__fadeInUp  animate__delay-2s" style={{
                                                    display: 'flex',
                                                    textAlign: "center",
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <img src={imdbImage} alt="" width={50} />
                                                    <span style={{ fontWeight: 900 }}>{item.vote_average}</span>
                                                </div>

                                                <div className="flex">
                                                    <button className='watch animate__animated animate__fadeInUp  animate__delay-3s' style={{ position: 'relative', zIndex: 2 }}>Watch Now</button>
                                                    <button className='watch animate__animated animate__fadeInUp  animate__delay-3s' style={{ position: 'relative', zIndex: 2 }}>Add to Watchlist</button>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </Carousel>
                    </div>
                    <div className="container">
                       <marquee className="flex_cards">
                       {
                            movieprovider.map((item, key) =>
                            <div>
                                <img src={`${baseUrlImage}${item.logo_path}`} alt="" className='animate__animated animate__fadeInUp' style={{
                                    animationDelay:`${key}`
                                }}/>
                            </div>
                            )
                        }
                       </marquee>
                    </div>
                    <div className="container">
                        <h4 className='bolder'>Upcoming Movies</h4>
                        <div className="flex_movie m_12">
                            {
                                upcomings.map((item, key) =>
                                    <MovieCard item={item} key={key} />
                                )
                            }
                        </div>
                        <h4 className='bolder pt_32'>Top Rated Movies</h4>
                        <div className="flex_movie m_12">
                            {
                                toprateds.map((item, key) =>
                                    <MovieCard item={item} key={key} />
                                )
                            }
                        </div>
                        <h4 className='bolder pt_32'>Most Populars</h4>
                        <div className="flex_movie m_12">
                            {
                                popular.map((item, key) =>
                                    <MovieCard item={item} key={key} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home