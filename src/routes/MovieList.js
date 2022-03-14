import { React, useState, useEffect } from "react";
import "./MovieList.css";
import axios from "axios";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [page, setPage] = useState(1);
  const [moviesInput, setMoviesInput] = useState("");
  const [isBadReq, setIsBadReq] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let URL = `https://demo.credy.in/api/v1/maya/movies/?page=`;

  const fetchData = async () => {
    let response;
    try {
      response = await axios.get(URL + page, {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });
    } catch (err) {
      setIsBadReq(true);
    }
    if (response) {
      setIsBadReq(false);
      setMovies(response.data.results);
      setMoviesCopy(response.data.results);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) return navigate("/");
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const newMovies = moviesCopy.filter((movie) =>
      movie.title.includes(moviesInput)
    );
    setMovies(newMovies);
  }, [moviesInput]);

  return !isBadReq ? (
    <>
      <Header setMoviesInput={setMoviesInput} handleLogout={handleLogout} />
      <section className="movie-list">
        {movies.map((movie) => (
          <Card
            key={movie.uuid}
            title={movie.title}
            description={movie.description}
            genres={movie.genres}
          />
        ))}
      </section>
      <Footer setPage={setPage} />
    </>
  ) : (
    <>
      <Header setMoviesInput={setMoviesInput} handleLogout={handleLogout} />
      <button
        className="refresh"
        onClick={async () => {
          setIsLoading(true);
          await fetchData();
          setIsLoading(false);
        }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Refresh"}
      </button>
    </>
  );
}

export default MovieList;
