import axios from 'axios';
import React, {useState} from 'react'
import { API_KEY, API_URL, SEARCH_DELAY } from '../utils/Constants';

function SearchBox({onSelectItem}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [noSearchFound, setNoSearchFound] = useState(false)
    const [searchList, setSearchList] = useState([])

    let timerID;
    
    const getMovieList = async (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm)
        setNoSearchFound(false)
        
        if(searchTerm.length < 3) return false;

        clearTimeout(timerID)
        setIsSearching(true)
        timerID = setTimeout(async () => {
            const {data} = await axios.get(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}`)
            if(data.Response === "True") {
                setSearchList(data.Search.splice(0,5));
            } else {
                setSearchList([]);
                setNoSearchFound(true)
            }
            setIsSearching(false)
        }, SEARCH_DELAY)
    }

    const selectMovie = (movieData) => {
        setSearchTerm("")
        if(onSelectItem) onSelectItem(movieData);
    }

    return (<div className="inner-form">
    <div className="basic-search">
      <div className="input-field">
        <input id="search" type="text" value={searchTerm} data-testid="searchinput" placeholder="Type Keywords" onChange={getMovieList} />
        <div className="icon-wrap">
          <svg fill="#ccc" aria-hidden="true"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </div>
      </div>
    </div>
    {searchTerm && <div className="autocomplete">
        {(!isSearching && !noSearchFound && searchList.length === 0) && <span className="desc" data-testid="minimum">Minimum 3 characters</span>}
        {isSearching && <span className="desc" data-testid="loding-movies">Loading movie list ...</span>}
        {(noSearchFound  && searchList.length === 0) && <span className="desc" data-testid="no-movies">No movies found</span>}
        {(!isSearching && searchList.length > 0) && 
        <ul className="list"  data-testid="list-movies">
            {
                searchList.map(movieItem => (<li key={movieItem.imdbID} onClick={() => selectMovie(movieItem)}>
                    <div className="movie-title">{movieItem.Title}</div>
                    <div className="movie-type">{movieItem.Type}, {movieItem.Year}</div>
                </li>))
            }
        </ul>
        }
    </div>}
  </div>)
}

export default SearchBox;