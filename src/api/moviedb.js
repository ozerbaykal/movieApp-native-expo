import axios from "axios";
import { apiKey } from "../constans";

//endpoints
const apiBaseUrl = "https://api.themoviedb.org/3"

const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndPoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`





//dynamic endpoints

const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`


const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null



export const fallbackMoviePoster = "https://tr.web.img4.acsta.net/c_310_420/pictures/210/064/21006464_2013051613332748.jpg"
export const fallbackPersonImage = "		https://images.mubicdn.net/images/cast_member/2184/cache-2992-1547409411/image-w856.jpg	"

const apiCall = async (endpoint, params) => {

    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : {}

    }

    try {
        const response = await axios.request(options);
        return response.data;

    } catch (error) {
        console.log("error:", error);
        return {}

    }


}
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndPoint)
}
export const fetchUpcominMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndPoint)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = params => {

    return apiCall(searchMoviesEndPoint, params);
}


