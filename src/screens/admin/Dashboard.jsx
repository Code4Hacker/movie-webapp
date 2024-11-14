import React, { useEffect, useState } from 'react'
import { Loading, MovieCard, SiderBar, TopLists } from '../../components'
import { BookmarkFill, PenFill, Search, Wifi } from 'react-bootstrap-icons'
import { baseUrlImage } from '../../provider/baseURLs'
import { Divider, SelectPicker, Tooltip, Whisper } from 'rsuite'
import Aos from 'aos'
import toast from 'react-hot-toast'
import { movieProviderPath, popularPath, searchPath, trendingsPath, upcomingPath } from '../../statics/urls'
import { Link, useNavigate } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import { fetchAllMovie } from '../../provider/requests/fetchallmovie'
import { movieslugId, signIn, trendings } from '../../statics/paths'
import { getWatchlists, getWatchlistsGraph, handleUpdate } from '../../provider/requests/hitmydb'
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth'
import genre from "../../raws/genres.json";
import ReactApexChart from 'react-apexcharts'
const Dashboard = () => {
    const storage = window.localStorage;
    const [bannerMovie, setBannerMovie] = useState([]);
    const [graphdata, setGraphdata] = useState();
    const [movieprovider, setMovieProvider] = useState([]);
    const [movies, setMovies] = useState([]);
    const [watchlists, setWatchlists] = useState([]);
    const [update, setUpdate] = useState(false);
    const [password, setPassword] = useState();
    const data = ['Default - (Now Playing)', 'popular', 'upcoming'].map(
        item => ({ label: item, value: item })
    );
    const isLogin = storage.getItem("isLogin") ?? "false";
    const fetchmovies = async ({ path }) => {
        let allTrendings = fetchAllMovie(`${path === 'popular' ? popularPath({ page: 1 }) : path === 'upcoming' ? upcomingPath({ page: 1 }) : trendingsPath({ page: 1 })
            }`);
        let movieProvider = fetchAllMovie(`${movieProviderPath}`);
        try {
            if ((await allTrendings).status === 200) {
                setBannerMovie((await allTrendings).data.results.splice(0, 5));
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
                setMovies((await movies).data.results.splice(0, 8));
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
        fetchmovies({ path: 'Default - (Now Playing)' })
        getWatchlists({ setWatchlists: setWatchlists })
        getWatchlistsGraph({ setGraphdata: setGraphdata });

    }, []);
    const nav = useNavigate();
    const slugdata = ({ contents }) => {
        storage.setItem("contents", JSON.stringify(contents));
        nav(movieslugId({ id: contents.id }));
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
        <div className='home_page dashboard'>
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
                                    <TopLists />
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
                                            <Whisper placement='bottom' controlId="control-id-click" trigger="click" speaker={<Tooltip className='profile'>
                                                <p onClick={() => setUpdate(true)}>{(storage.getItem("userN") !== null ? storage.getItem("userN") : "A").toUpperCase()} <span><PenFill /></span></p>

                                                {
                                                    update ? <>
                                                        <input type="password" placeholder='New Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        <button className='submitting' onClick={() => {
                                                            handleUpdate({ newpassword: password });
                                                            setPassword("");
                                                            setUpdate(false)
                                                        }}>Update</button>
                                                    </> :
                                                        <button className='trans' onClick={handleSignOut}>Sign Out</button>
                                                }
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
                            <div className="container shortlists">
                                <div className="">
                                    <p>Total Watchlists</p>
                                    <h1>{watchlists !== undefined ? watchlists?.length > 9 ? watchlists?.length : `0${watchlists?.length}` : 0}</h1>
                                </div>
                                <div className="">
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
                            </div>
                            <div className="container chart_container">
                                <div>
                                    <div id="chart">
                                        {
                                            graphdata != undefined ?
                                                <ReactApexChart options={graphdata.options} series={graphdata.series} type="area" height={350} />
                                                : ''
                                        }
                                    </div>
                                    <div id="html-dist"></div>
                                </div>
                            </div>
                            <div className="container center">
                                <h1 style={{
                                    marginBottom: '24px'
                                }}><span className='linear_text'>CUSTOMIZE YOUR GENRE</span></h1>
                                {
                                    genre.genres.map((item, key) => <button key={key} className='suggestions' onClick={(e) => {
                                        e.target.className = "clicked"
                                    }}>{item.name}</button>)
                                }
                            </div>
                            <div className="container">
                                <h4 className='bolder'>You're Watchlists</h4>
                                <div className="prev_card m_12">
                                    {
                                        watchlists !== undefined && watchlists?.length > 0 ? watchlists.slice(0, 5).map((item, key) =>
                                            <Link className='search_movie watchl' key={key}>
                                                <img src={`${baseUrlImage}${item.poster_path}`} alt="" />
                                            </Link>
                                        ) : <div className="empty">
                                            <p><span><BookmarkFill /></span> {isLogin === "true" ? "Start to add your watchlists" : "Sign Up to Add your watchlists"}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="container">
                                <div className="space_btn">
                                    <h4 className='bolder'>Latest <span style={{ color: 'var(--secondary', fontWeight: 900 }}>Five</span> Movies</h4>
                                    <SelectPicker className='button filter'
                                        data={data}
                                        searchable={false}
                                        style={{ width: 224 }}
                                        placeholder="filter By"
                                        onChange={(e) => fetchmovies({ path: e })}
                                    />
                                </div>
                                <div className="flex_movie m_12">
                                    {
                                        bannerMovie.map((item, key) =>
                                            <MovieCard item={item} setWatchlists={setWatchlists} key={key} />
                                        )
                                    }
                                </div>
                                <div className="space_btn" style={{
                                    justifyContent:'center'
                                }}>
                                    <Link className='button' to={trendings}>View All</Link>
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

export default Dashboard