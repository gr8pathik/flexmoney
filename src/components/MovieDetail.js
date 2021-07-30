import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { API_KEY, API_URL } from '../utils/Constants';

function MovieDetail({movieData}) {
    const [movieMetaData, setMovieMetaData] = useState("")
    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get(`${API_URL}?i=${movieData.imdbID}&apikey=${API_KEY}`)
            setMovieMetaData(data);
        }
        fetchData();
    }, [movieData.imdbID])

    return (<div className="movie-card" data-testid="movie-card">
        {movieData.Poster !== 'N/A' && <div className="movie-right" data-testid="movie-right">
            <img src={movieData.Poster} alt={movieData.Title} />
        </div>}
        <div className="movie-left">
            <div className="movie-header">
                <div className="movie-title" data-testid="movie-title">{movieData.Title}</div>
                <div className="movie-rating" data-testid="movie-rating"><span>&#9733;</span> {movieMetaData.imdbRating} / 10</div>
            </div>
            <div className="movie-info">{movieMetaData.Released} &#8226; {movieMetaData.Runtime} &#8226; {movieMetaData.Genre} &#8226; {movieMetaData.Language}</div>
            <div className="movie-meta"><b>Director:</b> {movieMetaData.Director}</div>
            <div className="movie-meta"><b>Writer:</b> {movieMetaData.Writer}</div>
            <div className="movie-meta"><b>Actors:</b> {movieMetaData.Actors}</div>
            <div className="movie-meta"><b>Plot:</b> {movieMetaData.Plot}</div>
        </div>
    </div>)
}

export default MovieDetail;