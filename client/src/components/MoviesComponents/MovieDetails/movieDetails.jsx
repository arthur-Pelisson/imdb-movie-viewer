import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RequestBuilder from '../../../request/request';
import StarRatings from 'react-star-ratings';
import Genres from '../../GenreComponents/Genres';
import { getMovieById } from '../movie.service';

export default function MovieDetails() {
  const { id } = useParams();
  const { Data, Status, Error} = getMovieById({id});

  const displayMovieDetails = () => {
    console.log("DATA : " , Data);

    if (Status === "loading" && Status === "") {
      return <div>Loading...</div>
    }

    if (Status === "error" && Error?.message) {
      return <div>Error : {Error.message}</div>
    }
    if (
      Status === "success" &&
      Data &&
      Data.data 
    ) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg m-auto w-[99%]">
        <div className="flex flex-col md:flex-row ">
          <div className="md:w-1/3 xl:max-w-[29%] ml-[10px] m-auto">
            <img className="w-full h-auto object-cover" src={"https://image.tmdb.org/t/p/w500/" + Data.data.poster_path} alt={Data.data.title} />
          </div>
          <div className="md:w-2/3 p-6">
            <h2 className="text-3xl font-bold mb-2">{Data.data.title}</h2>
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18.571c-4.648 0-8.571-3.924-8.571-8.571S5.352 1.429 10 1.429 18.571 5.352 18.571 10 14.648 18.571 10 18.571z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M9.868 4.746c-.11-.284-.385-.47-.68-.47H4.906c-.295 0-.57.186-.68.47L2.053 9.068c-.11.284-.11.596 0 .88l1.544 3.322c.11.284.385.47.68.47h3.283c.295 0 .57-.186.68-.47l1.544-3.322c.11-.284.11-.596 0-.88L9.868 4.746zM6.778 11.61l-.92-1.98h5.284l-.92 1.98H6.778z" clipRule="evenodd" />
              </svg>
              <p className="text-lg font-medium"></p>
            </div>
            <p className="text-lg mb-4">Synopsise : <br></br>{Data.data.overview}</p>
            <div className="flex justify-between">
              <p className="text-lg font-medium">Date de sortie : {Data.data.release_date}</p>
            </div>
            <div>
              <Genres
                allData={Data.data.genres}
              />
            <div>Nombre de vote : {Data.data.vote_count}</div>
              <StarRatings
                rating={Data.data.vote_average/2}
                starDimension="40px"
                starSpacing="15px"
                starRatedColor="yellow"
              />
            </div>
          </div>
        </div>
      </div>
    )};
  }

  return (
    <div>{displayMovieDetails()}</div>
    );
    
}