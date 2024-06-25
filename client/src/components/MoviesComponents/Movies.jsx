import React, { useEffect, useMemo, useState} from "react";
import Genres from "../GenreComponents/Genres";
import RequestBuilder from "../../request/request";
import {MoviePlaceHolder, MovieImgPlaceHolder} from "../placeholder/moviePlaceHolder";
import { Link } from "react-router-dom";
import { getAllGenre } from "../GenreComponents/genre.service";
import ImageComponent from "./imageComponent";
import axios from 'axios';
import { getMovieByName, getHomeMovie } from "./movie.service";


const Movies = ({data}) => {
    const {dataGenres, statusGenres, errorGenres} = getAllGenre();
    if (data === "") {
      var { dataMovie, statusMovie, errorMovie} = getHomeMovie()  
    } else {
      var { dataMovie, statusMovie, errorMovie} = getMovieByName({data})
    }
    const [movie, setMovie] = useState({dataMovie:dataMovie, statusMovie:statusMovie, errorMovie:errorMovie});
    const [loadImg, setLoadImg] = useState(false);
    const [cancelToken, setCancelToken] = useState(null);

  const displayMovie = () => {
    // console.log(dataMovie);
    // console.log(errorMovie);
    // console.log(dataGenres);
    if (statusMovie === "loading" || statusMovie === "" || statusGenres === "" || statusGenres === "loading") {
      const loadingElements = Array.from({ length: 10 }, (_, i) => (
        <MoviePlaceHolder key={i} />
      ));
      return <div className="flex flex-wrap">{loadingElements}</div>;
    }

    if (statusMovie === "error" && errorMovie?.message) {
      return <div>Error: {errorMovie.message}</div>;
    }

    if (
      statusMovie === "success" &&
      dataMovie &&
      dataMovie.results &&
      dataMovie.results.length > 0
    ) {
      return (
        <div>
          <div className="flex 2xl:min-w-[1412px] lg:min-w-[1132px] lg:min-w-[1412px] md:min-w-[850px] flex-wrap justify-center md:justify-start">
            {dataMovie.results.map((movie) => (
              <div
                className="lg:w-1/4 xl:w-1/5 w-[300px]  flex-col mt-5 md:w-1/3"
                key={movie.id}
              >
                <div className="max-w-sm rounded overflow-hidden shadow-lg h-full">
                  <div className="imgContainer">
                    <Link
                      to={`/movie/${movie.id}`}
                      state={{ movie: movie }}
                    >
                      <ImageComponent movie={movie}/>
                    </Link>
                  </div>
                  <div className="px-6 py-4 movie-title">
                    <div className="font-bold text-xl mb-2 text-center truncate">
                      {movie.title}
                    </div>
                  </div>
                  <Genres
                    requetGenres={{dataGenres:dataGenres, errorGenres:errorGenres, statusGenres:statusGenres}}
                    genres={movie.genre_ids}
                    limite={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // console.log("DATA : ", dataMovie);
    // console.log("STATUS : ", statusMovie);
    // console.log("ERROR : ", errorMovie);
    return <div>No movies found.</div>;
  }

  return <div>{displayMovie()}</div>;
};

export default Movies;