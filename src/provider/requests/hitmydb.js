import axios from "axios";
import { mr_db } from "../baseURLs";
import toast from 'react-hot-toast'
import { movie_format } from "../../components/jsonbuilder";
import genre from "../../raws/genres.json"
import { updatePath, watchlistGraphPath, watchlistsPath } from "../../statics/urls";
export const server_provider = async ({ path, method, body }) => {
    let request = await axios.request({
        url: `${mr_db}${path}`,
        method: method,
        headers: {
            "Authorization": `Bearer ${window.localStorage.thetoken ?? ""}`
        },
        data: body
    });
    return request;
}
let storage = window.localStorage;
export const addWatchList = async ({ movie, setWatchlists }) => {
    let save_movie = server_provider({ path: watchlistsPath, method: 'POST', body: movie_format({ movie: movie, username: storage.getItem("userN") !== null ? storage.getItem("userN") : "A" }) });
    if (((await save_movie).status) === 200) {
        console.log((await save_movie).data)
        let responses = (await save_movie).data;
        switch (responses.status) {
            case 200:
                toast.success(responses.message);
                getWatchlists({ setWatchlists: setWatchlists });
                break;
            default:
                console.log(responses.message === "undefined");
                toast.error(`${(responses.message) === "undefined" ? "Please Login first to add watchlist" : responses.message}`);
                break;
        }
    }
}
export const getGenre = ({ id }) => {
    for (let i = 0; i < genre.genres.length; i++) {
        if (id.toString() === genre.genres[i].id.toString()) {
            return genre.genres[i].name
        }
    }
}
export const getWatchlists = async ({ setWatchlists }) => {
    const username = storage.getItem("userN") !== null ? storage.getItem("userN") : "A";
    const get_movies = server_provider({
        path: `${watchlistsPath}?id=${username}`,
        method: 'GET',
        body: JSON.stringify({
            id: username
        })
    });
    if (((await get_movies).status) === 200) {
        let responses = (await get_movies).data;
        switch (responses.status) {
            case 200:
                setWatchlists(responses.results)
                break;
            default:
                toast.error(`${responses.message}`);
                break;
        }
    }
}
export const getWatchlistsGraph = async ({ setGraphdata }) => {
    const username = storage.getItem("userN") !== null ? storage.getItem("userN") : "A";
    const get_movies = server_provider({
        path: `${watchlistGraphPath}?id=${username}`,
        method: 'GET',
        body: JSON.stringify({
            id: username
        })
    });
    if (((await get_movies).status) === 200) {
        let responses = (await get_movies).data;
        setGraphdata(responses)
    }
}
export const handleUpdate = async({newpassword}) => {
    const username = storage.getItem("userN") !== null ? storage.getItem("userN") : "A";
    const update = server_provider({
        path: `${updatePath}`,
        method: 'POST',
        body: JSON.stringify({
            username: username,
            new_password: newpassword
        })
    });
    console.log((await update).data)
    let responses = (await update).data;
    if (((await update).status) === 200) {
        toast.success("Update Success")
    }else{
        toast.error(responses.message)
    }
}