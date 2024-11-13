import React, { useEffect, useState } from 'react'
import { Loading, MovieCard, SiderBar, TopLists } from '../../components'
import { BookmarkFill, Search, Wifi } from 'react-bootstrap-icons'
import { baseUrlImage } from '../../provider/baseURLs'
import { Divider, Tooltip, Whisper,  Pagination } from 'rsuite'
import Aos from 'aos'
import toast from 'react-hot-toast'
import { popularPath, searchPath } from '../../statics/urls'
import { Link, useNavigate } from 'react-router-dom'
import { fetchAllMovie } from '../../provider/requests/fetchallmovie'
import { signIn } from '../../statics/paths'
import { getWatchlists} from '../../provider/requests/hitmydb'
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth'
const Trendings = () => {
  const storage = window.localStorage;
  const [populars, setPopulars] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [watchlists, setWatchlists] = useState([]);
  const isLogin = storage.getItem("isLogin") ?? "false";
  const fetchmovies = async ({pagenumber}) => {
    let populars = fetchAllMovie(`${popularPath({ page: pagenumber })}`);
    try {
      if ((await populars).status === 200) {
        setPopulars((await populars).data.results);
        setTotalPage((await populars).data.total_pages)
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
    fetchmovies({pagenumber:activePage})
    getWatchlists({ setWatchlists: setWatchlists })
  }, []);
  const nav = useNavigate();
  // const slugdata = ({contents}) => {
  //     storage.setItem("contents", JSON.stringify(contents));
  //     nav(movieslugId({id:contents.id}));
  // }
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
        populars !== undefined && populars?.length > 0 ?
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
              <div className="container centered topped">
                <div className="">
                  <Pagination
                    ellipsis={true}
                    maxButtons={10}
                    prev={true}
                    last={true}
                    first={true}
                    next={true}
                    limitOptions={10}
                    pages={totalPage}
                    total={totalPage}
                    activePage={activePage}
                    onChangePage={(e) => {setActivePage(e);fetchmovies({pagenumber:e})}}

                    className='paged'
                  />
                </div>
              </div>
              <div className="container">
                <div className="flex_movie flex2 m_12">
                  {
                    populars.map((item, key) =>
                      <MovieCard item={item} setWatchlists={setWatchlists} key={key} />
                    )
                  }
                </div>
              </div>
              <div className="container centered topped">
                <div className="" style={{
                  marginTop:'-50px',
                  marginBottom:'50px'
                }}>
                  <Pagination
                    ellipsis={true}
                    maxButtons={10}
                    prev={true}
                    last={true}
                    first={true}
                    next={true}
                    limitOptions={10}
                    pages={totalPage}
                    total={totalPage}
                    activePage={activePage}
                    onChangePage={(e) => setActivePage(e)}

                    className='paged'
                  />
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

export default Trendings