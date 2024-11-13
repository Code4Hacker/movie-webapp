import React, { useEffect, useState } from 'react'
import { Loading, MovieCard, SiderBar, TopLists } from '../../components'
import {  imdbImage } from '../../assets'
import { BookmarkFill, Search, Wifi } from 'react-bootstrap-icons'
import { baseUrlImage } from '../../provider/baseURLs'
import { Carousel, Container, Divider, Tooltip, Whisper} from 'rsuite'
import Aos from 'aos'
import toast from 'react-hot-toast'
import { movieProviderPath, popularPath, searchPath, topratedPath, trendingsPath, upcomingPath } from '../../statics/urls'
import { Link, useNavigate } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import { fetchAllMovie } from '../../provider/requests/fetchallmovie'
import { coming, movieslugId, signIn } from '../../statics/paths'
import { addWatchList, getWatchlists} from '../../provider/requests/hitmydb'
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth'
import MovieCard2 from '../../components/MovieCard2'
const Home = () => {
    const storage = window.localStorage;
    const [bannerMovie, setBannerMovie] = useState([]);
    const [popular, setPopular] = useState([]);
    const [upcomings, setUpcomings] = useState([]);
    const [toprateds, setToprateds] = useState([]);
    const [movieprovider, setMovieProvider] = useState([]);
    const [movies, setMovies] = useState([]);
    const [watchlists, setWatchlists] = useState([]);
    const isLogin = storage.getItem("isLogin") ?? "false";
    const fetchmovies = async () => {
        let allTrendings = fetchAllMovie(`${trendingsPath({ page: 1 })}`);
        let populars = fetchAllMovie(`${popularPath({ page: 1 })}`);
        let upcomings = fetchAllMovie(`${upcomingPath({ page: 1 })}`);
        let toprated = fetchAllMovie(`${topratedPath({ page: 1 })}`);
        let movieProvider = fetchAllMovie(`${movieProviderPath}`);
        try {
            if ((await allTrendings).status === 200) {
                setBannerMovie((await allTrendings).data.results.splice(0, 5));
                setPopular((await populars).data.results.splice(0, 8));
                setToprateds((await toprated).data.results.splice(0, 8));
                setUpcomings((await upcomings).data.results.splice(0, 8));
                setMovieProvider((await movieProvider).data.results);
            } else {
                toast.error("something went wrong");
            }
        } catch (error) {
            toast.error(`${error}`)
        }
    }
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
    const handleSignOut = async () => {
        try {
          await signOut(auth);
          storage.clear();
          toast.success("logout success")
          window.location.href = "";
        } catch (error) {
          console.error("Error signing out", error);
        }
      };
    useEffect(() => {
        Aos.init()
        fetchmovies()
        getWatchlists({setWatchlists:setWatchlists})
    }, []);
    const nav = useNavigate();
    const slugdata = ({contents}) => {
        storage.setItem("contents", JSON.stringify(contents));
        nav(movieslugId({id:contents.id}));
    }
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
            maxHeight: '800px'
        }}>
            <div className="container">
                <h6 style={{
                    fontWeight: 900
                }}>WATCHLISTS</h6>
                <Divider style={{
                    backgroundColor: 'var(--secondary)'
                }} />
                {
                    watchlists !== undefined && watchlists?.length > 0 ? watchlists.map((item, key) =>
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
                        <p><span><BookmarkFill /></span> {isLogin === "true" ? "Start to add your watchlists" : "Sign Up to Add your watchlists"}</p>
                    </div>
                }
            </div>
        </Tooltip>
    );
    return (
        <div className='home_page'>
            <Loading />
            {
                bannerMovie !== undefined && bannerMovie?.length > 0 ?
                    <div className="grid">
                        <div className="grid_items">
                            <SiderBar />
                        </div>
                        <div className="grid_items">
                            <div className="topnav">
                                <ul>
                                   <TopLists/>
                                </ul>
                                <div className="flex">

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
                                {
                                    isLogin === "true" ?
                                        <Whisper placement='bottom' controlId="control-id-click" trigger="click" speaker={<Tooltip>
                                            <button className='trans' onClick={handleSignOut}>Sign Out</button>
                                        </Tooltip>}>
                                            <div className="avatar">
                                            <div className="shadow_over">
                                                <h1>{(storage.getItem("userN") !== null ? storage.getItem("userN").slice(0, 1) : "A").toUpperCase()}</h1>
                                            </div>
                                        </div>
                                        </Whisper> : <Link className="login" to={signIn}>
                                            Sign Up
                                        </Link>
                                }

                                </div>
                            </div>
                            <div className="">
                                <Carousel className='cc' autoplay autoplayInterval={9000}>
                                    {
                                        bannerMovie.map((item, key) => <div className="banner" style={{
                                            backgroundImage: `url(${baseUrlImage}${item.backdrop_path})`
                                        }} key={key}>
                                            <div className="shadow_over">
                                                <div className="contents">
                                                    <Container>
                                                        <h1 className='animate__animated animate__fadeInUp'>{item.title}</h1>
                                                        <p className='animate__animated animate__fadeInUp  animate__delay-1s'>{item.overview?.length > 475 ? item.overview.substring(0, 475)+"...":item.overview}</p>
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
                                                            <button className='watch animate__animated animate__fadeInUp  animate__delay-3s' style={{ position: 'relative', zIndex: 2 }}  onClick={() => slugdata({contents: item})}>Watch Now</button>
                                                            <button className='watch animate__animated animate__fadeInUp  animate__delay-3s' style={{ position: 'relative', zIndex: 2 }} onClick={() => addWatchList({ movie: item, setWatchlists:setWatchlists })}>Add to Watchlist</button>
                                                        </div>
                                                    </Container>
                                                </div>
                                            </div>
                                        </div>)
                                    }
                                </Carousel>
                            </div>
                            <div className="container">
                                <Marquee className="flex_cards" loop={0} gradient={true} gradientColor='rgb(23, 23, 29)' gradientWidth={320}>
                                    {
                                        movieprovider.map((item, key) =>
                                            <div key={key}>
                                                <img src={`${baseUrlImage}${item.logo_path}`} alt="" className='animate__animated animate__fadeInUp' style={{
                                                    animationDelay: `${key}`
                                                }} />
                                            </div>
                                        )
                                    }
                                </Marquee>
                            </div>
                            <div className="container">
                                <div className="space_btn">

                                <h4 className='bolder'>Upcoming Movies</h4>
                                <Link className='button' to={coming}>View All</Link>
                                </div>
                                <div className="flex_movie m_12">
                                    {
                                        upcomings.map((item, key) =>
                                            <MovieCard item={item} setWatchlists={setWatchlists} key={key} />
                                        )
                                    }
                                </div>
                                <h4 className='bolder pt_32'>Top Rated Movies</h4>
                                {/* <div className="container">
                                <Marquee className="flex_cards" loop={0} gradient={true} gradientColor='black' gradientWidth={320} direction='right'>
                                {
                                        toprateds.map((item, key) =>
                                            <MovieCard2 item={item} key={key} />
                                        )
                                    }
                                </Marquee>
                                <Marquee className="flex_cards" loop={0} gradient={true} gradientColor='black' gradientWidth={320} direction='left'>
                                {
                                        toprateds.map((item, key) =>
                                            <MovieCard2 item={item} key={key} />
                                        )
                                    }
                                </Marquee>
                            </div> */}
                                <div className="flex_movie m_12" style={{
                                    overflow:'hidden'
                                }}>
                                    {
                                        toprateds.map((item, key) =>
                                            <MovieCard2 item={item} key={key} />
                                        )
                                    }
                                </div>
                                <div className="space_btn">

                                <h4 className='bolder'>Most Populars</h4>
                                <Link className='button' to={coming}>View All</Link>
                                </div>
                                <div className="flex_movie m_12">
                                    {
                                        popular.map((item, key) =>
                                            <MovieCard item={item} setWatchlists={setWatchlists} key={key} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="centered_error">
                        <div className="centered">
                            <h1>😳</h1>
                            <p>Sorry, we can't access any server right now</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Home