import React, {useState} from 'react'
import MovieDetail from './MovieDetail'
import SearchBox from './SearchBox'

function Home() {
    const [movieData, setMovieData] = useState("")
    return (<>
    <SearchBox onSelectItem={setMovieData} />
    {movieData && <MovieDetail movieData={movieData} />}
    </>)
}

export default Home