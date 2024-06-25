import React, {useEffect, useMemo, useState} from "react";
import RequestBuilder from "../../request/request";
import axios from "axios";

export const getAllGenre = () => {
    const type = "get";
    const url = `http://localhost:8000/api/movie/getGenres`;
    const { Data, Status, Error, Request } = RequestBuilder();
    const [cancelToken, setCancelToken] = useState(null);

    
    useEffect(() => {
      const source = axios.CancelToken.source();
      setCancelToken(source);
      Request({ 
        type, 
        url, 
        debug:false, 
        cacheKey: "genres" 
      });
      
      return () => {
        //cancel requete axios
        if (cancelToken !== null) {
          cancelToken.cancel("Requête annulée");
        }
      };
    }, []);

    //optimisation d'un call 
    const memodata = useMemo(() => Data, [Data]);

  return {
    dataGenres: memodata,
    statusGenres: Status,
    errorGenres: Error,
  }
}