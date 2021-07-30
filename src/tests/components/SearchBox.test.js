import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from "axios";
import SearchBox from '../../components/SearchBox'

jest.mock("axios")

describe("SearchBox tests", () => {
    it('should render the search text box', () => {
        const { container } = render(<SearchBox />)
        expect(container).toMatchSnapshot();
    })
    it('should show the mimimun 3 character text', () => {
        const { container, getByTestId } = render(<SearchBox />)
        const searchInput = getByTestId("searchinput");
        fireEvent.change(searchInput, {target: {value: 'ab'}})
        const minimum = getByTestId("minimum")
        expect(minimum).toBeInTheDocument();
        expect(minimum).toHaveTextContent("Minimum 3 characters")
    })
    it('should show the loading text and list the movies', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                Response: "True",
                Search: [{
                    "Title": "Madrid, int.",
                    "Year": "2020",
                    "imdbID": "tt12280634",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BMzhmNzE5YjItNGZhYi00ZjAzLTkyNjctODQzOTkxOGEyNzA2XkEyXkFqcGdeQXVyMTM2Mzg4MA@@._V1_SX300.jpg"
                },
                {
                    "Title": "Int. Bedsit - Day",
                    "Year": "2007",
                    "imdbID": "tt1116035",
                    "Type": "movie",
                    "Poster": "N/A"
                },
                {
                    "Title": "Int. Kitchen. Night",
                    "Year": "2018",
                    "imdbID": "tt9044492",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BODAwYjU0MzYtZGJlMy00NGQyLWFkYTYtNTUwYWYxNGU4NGU0XkEyXkFqcGdeQXVyMjk1NzAxNg@@._V1_SX300.jpg"
                }]
            }
          });        
        const { container, getByTestId, queryByTestId } = render(<SearchBox />)
        const searchInput = getByTestId("searchinput");
        fireEvent.change(searchInput, {target: {value: 'abcd'}})
        const minimum = queryByTestId("minimum")
        expect(minimum).not.toBeInTheDocument();
        expect(getByTestId("loding-movies")).toBeInTheDocument()
        expect(getByTestId("loding-movies")).toHaveTextContent("Loading movie list ...")
        await waitFor(() => {
            const listMovies = queryByTestId("list-movies");
            expect(listMovies).toBeInTheDocument()
            expect(listMovies.children).toHaveLength(3)
            expect(container).toMatchSnapshot();
        })
    })
    it('should show the no movies text', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                Response: "False",
                Search: []
            }
          });        
        const { container, getByTestId, queryByTestId } = render(<SearchBox />)
        const searchInput = getByTestId("searchinput");
        fireEvent.change(searchInput, {target: {value: 'empty'}})
        const minimum = queryByTestId("minimum")
        expect(minimum).not.toBeInTheDocument();
        expect(getByTestId("loding-movies")).toBeInTheDocument()
        expect(getByTestId("loding-movies")).toHaveTextContent("Loading movie list ...")
        await waitFor(() => {
            const noMovies = queryByTestId("no-movies");
            expect(noMovies).toBeInTheDocument()
            expect(noMovies).toHaveTextContent("No movies found")
        })
    })
    it('should call onSelectItem when item selected', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                Response: "True",
                Search: [{
                    "Title": "Madrid, int.",
                    "Year": "2020",
                    "imdbID": "tt12280634",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BMzhmNzE5YjItNGZhYi00ZjAzLTkyNjctODQzOTkxOGEyNzA2XkEyXkFqcGdeQXVyMTM2Mzg4MA@@._V1_SX300.jpg"
                },
                {
                    "Title": "Int. Bedsit - Day",
                    "Year": "2007",
                    "imdbID": "tt1116035",
                    "Type": "movie",
                    "Poster": "N/A"
                },
                {
                    "Title": "Int. Kitchen. Night",
                    "Year": "2018",
                    "imdbID": "tt9044492",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BODAwYjU0MzYtZGJlMy00NGQyLWFkYTYtNTUwYWYxNGU4NGU0XkEyXkFqcGdeQXVyMjk1NzAxNg@@._V1_SX300.jpg"
                }]
            }
          });      
        const onSelectItem = jest.fn();  
        const { container, getByTestId, queryByTestId } = render(<SearchBox onSelectItem={onSelectItem} />)
        const searchInput = getByTestId("searchinput");
        fireEvent.change(searchInput, {target: {value: 'abcd'}})
        const minimum = queryByTestId("minimum")
        expect(minimum).not.toBeInTheDocument();
        expect(getByTestId("loding-movies")).toBeInTheDocument()
        expect(getByTestId("loding-movies")).toHaveTextContent("Loading movie list ...")
        await waitFor(() => {
            const listMovies = queryByTestId("list-movies");
            fireEvent.click(listMovies.firstChild)
            expect(onSelectItem).toHaveBeenCalledWith({
                "Title": "Madrid, int.",
                "Year": "2020",
                "imdbID": "tt12280634",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMzhmNzE5YjItNGZhYi00ZjAzLTkyNjctODQzOTkxOGEyNzA2XkEyXkFqcGdeQXVyMTM2Mzg4MA@@._V1_SX300.jpg"
            });
        })
    })
})
