import RequestBuilder  from "../../request/request";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const getHomeMovie = () => {
    const { Data, Status, Error, Request} = RequestBuilder();
    const [cancelToken, setCancelToken] = useState(null);

    const url = "http://localhost:8000/api/movie/movies";
    const type = "get";
    const data = "";

    useEffect(() => {
        const source = axios.CancelToken.source();
        setCancelToken(source);
        Request({ 
          type, 
          url, 
          data,
          debug:false, 
          cacheKey: "movies",
          limiteCall: 10,
          timeCacheOut: 100000
        });
        
        return () => {
          //cancel requete axios
          if (cancelToken !== null) {
            cancelToken.cancel("Requête annulée");
          }
        };
      }, [data]);
      
    return {dataMovie:Data, statusMovie:Status, ErrorMovie:Error};

} 

export const getMovieByName = ({data}) => {
    const { Data, Status, Error, Request} = RequestBuilder();
    const [cancelToken, setCancelToken] = useState(null);

    const url = "http://localhost:8000/api/movie/searchMovie";
    const type = "post";
    useEffect(() => {
        const source = axios.CancelToken.source();
        setCancelToken(source);
        Request({ 
          type, 
          url, 
          data,
          debug:false, 
          cacheKey: "movies"
        });
        
        return () => {
          //cancel requete axios
          if (cancelToken !== null) {
            cancelToken.cancel("Requête annulée");
          }
        };
      }, [data]);
      
    return {dataMovie:Data, statusMovie:Status, ErrorMovie:Error};

}


export const getMovieById = ({id}) => {
    const { Data, Status, Error, Request} = RequestBuilder();
    const [cancelToken, setCancelToken] = useState(null);

    const url = `http://localhost:8000/api/movie/getMovieById/${id}`;
    const type = "get";
    useEffect(() => {
        const source = axios.CancelToken.source();
        setCancelToken(source);
        Request({ 
            type,
            url,
            cacheKey: "movies",
            debug: true,
            limiteCall: 10,
            timeCacheOut: 100000
        });
        
        return () => {
          //cancel requete axios
          if (cancelToken !== null) {
            cancelToken.cancel("Requête annulée");
          }
        };
      }, []);
      
    return {Data, Status, Error};

}