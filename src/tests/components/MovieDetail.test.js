import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from "axios";
import renderer from 'react-test-renderer';
import MovieDetail from '../../components/MovieDetail'

jest.mock("axios")

describe("SearchBox tests", () => {
    it('should render the movie data', async () => {
        const movieData = {
            "Title": "Madrid, int.",
            "Year": "2020",
            "imdbID": "tt12280634",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMzhmNzE5YjItNGZhYi00ZjAzLTkyNjctODQzOTkxOGEyNzA2XkEyXkFqcGdeQXVyMTM2Mzg4MA@@._V1_SX300.jpg"
        };
        axios.get.mockResolvedValueOnce({
            data: {
                "Title": "Madrid, int.",
                "Year": "2020",
                "Rated": "N/A",
                "Released": "08 May 2020",
                "Runtime": "75 min",
                "Genre": "N/A",
                "Director": "Juan Cavestany",
                "Writer": "N/A",
                "Actors": "Lorena Iglesias, Petra del Rey, Carlos Martínez",
                "Plot": "N/A",
                "Language": "Spanish",
                "Country": "Spain",
                "Awards": "N/A",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMzhmNzE5YjItNGZhYi00ZjAzLTkyNjctODQzOTkxOGEyNzA2XkEyXkFqcGdeQXVyMTM2Mzg4MA@@._V1_SX300.jpg",
                "Ratings": [
                    {
                        "Source": "Internet Movie Database",
                        "Value": "7.1/10"
                    }
                ],
                "Metascore": "N/A",
                "imdbRating": "7.1",
                "imdbVotes": "26",
                "imdbID": "tt12280634",
                "Type": "movie",
                "DVD": "N/A",
                "BoxOffice": "N/A",
                "Production": "N/A",
                "Website": "N/A",
                "Response": "True"
            }
          });  
        const { container, getByTestId } = render(<MovieDetail movieData={movieData} />)
        await waitFor(() => {
            expect(getByTestId("movie-right")).toBeInTheDocument();
            expect(getByTestId("movie-title")).toHaveTextContent("Madrid, int.")
            expect(getByTestId("movie-rating")).toHaveTextContent("★ 7.1 / 10")
        })
        expect(container).toMatchSnapshot()
    })
    it('should render the movie data without poster', async () => {
        const movieData = {
            "Title": "Madrid, int.",
            "Year": "2020",
            "imdbID": "tt12280634",
            "Type": "movie",
            "Poster": "N/A"
        };
        axios.get.mockResolvedValueOnce({
            data: {
                "Title": "Madrid, int.",
                "Year": "2020",
                "Rated": "N/A",
                "Released": "08 May 2020",
                "Runtime": "75 min",
                "Genre": "N/A",
                "Director": "Juan Cavestany",
                "Writer": "N/A",
                "Actors": "Lorena Iglesias, Petra del Rey, Carlos Martínez",
                "Plot": "N/A",
                "Language": "Spanish",
                "Country": "Spain",
                "Awards": "N/A",
                "Poster": "N/A",
                "Ratings": [
                    {
                        "Source": "Internet Movie Database",
                        "Value": "7.1/10"
                    }
                ],
                "Metascore": "N/A",
                "imdbRating": "7.1",
                "imdbVotes": "26",
                "imdbID": "tt12280634",
                "Type": "movie",
                "DVD": "N/A",
                "BoxOffice": "N/A",
                "Production": "N/A",
                "Website": "N/A",
                "Response": "True"
            }
          });  
        const { container, getByTestId, queryByTestId } = render(<MovieDetail movieData={movieData} />)
        await waitFor(() => {
            expect(queryByTestId("movie-right")).not.toBeInTheDocument();
            expect(getByTestId("movie-title")).toHaveTextContent("Madrid, int.")
            expect(getByTestId("movie-rating")).toHaveTextContent("★ 7.1 / 10")
        })
        expect(container).toMatchSnapshot()
    })
})
