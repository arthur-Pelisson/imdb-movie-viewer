import React, { useEffect } from "react";
import RequestBuilder from "../../request/request";
import { MovieGenrePlaceHolder } from "../placeholder/moviePlaceHolder";

const Genres = (genres) => {

  const mapGenres = (genres) => {
    return (
    <div className="px-6 pt-4 pb-2 items-center">
    {genres.map((genre) => (
        <span key={genre.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {genre.name}
      </span>
    ))}
    </div>
    )
  }
  
  const displayGenres = (props) => {
    const genresName = [];
    genres = props.genres;

    if (props?.allData) {
      return (
        <div>{mapGenres(props.allData)}</div>
      )
    }

    if (props?.limite && genres.length > props.limite) {
        genres = genres.slice(0, props.limite);
    }

    if (props.requetGenres.statusGenres === "loading") {
        const loadingElements = Array.from({ length: genres.length }, (_, i) => (
          <MovieGenrePlaceHolder key={i} />
        ));

        return(<div className="px-6 pt-4 pb-2">{loadingElements}</div>);
    }
  
    if (props.requetGenres.statusGenres === "error") {
      return <div>Error: {Error.message}</div>;
    }

    if (props.requetGenres.statusGenres === "success" && props.requetGenres.dataGenres && props.requetGenres.dataGenres.genres && props.requetGenres.dataGenres.genres.length > 0) {
        genres.forEach((genreId) => {
            const matchedGenre = props.requetGenres.dataGenres.genres.find((genre) => genre.id === parseInt(genreId));
            if (matchedGenre) {
              genresName.push(matchedGenre);
            }
          });
      return (
        <div>{mapGenres(genresName)}</div>
      );
    }
  
    return <div></div>;
  };
  

  return <div>{displayGenres(genres)}</div>;
};

export default Genres;
